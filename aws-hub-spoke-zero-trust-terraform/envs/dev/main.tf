provider "aws" {
  region = var.aws_region
}

data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    Owner       = var.owner
    ManagedBy   = "Terraform"
  }

  azs = slice(data.aws_availability_zones.available.names, 0, 2)
}

module "hub_vpc" {
  source = "../../modules/vpc"

  vpc_name             = "hub-vpc"
  vpc_cidr             = "10.0.0.0/16"
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.11.0/24", "10.0.12.0/24"]
  azs                  = local.azs
  create_igw           = true
  create_nat_gateway   = true
  tags                 = local.common_tags
}

module "spoke1_vpc" {
  source = "../../modules/vpc"

  vpc_name             = "spoke1-vpc"
  vpc_cidr             = "10.1.0.0/16"
  public_subnet_cidrs  = ["10.1.1.0/24", "10.1.2.0/24"]
  private_subnet_cidrs = ["10.1.11.0/24", "10.1.12.0/24"]
  azs                  = local.azs
  create_igw           = true
  create_nat_gateway   = true
  tags                 = local.common_tags
}

module "spoke2_vpc" {
  source = "../../modules/vpc"

  vpc_name             = "spoke2-vpc"
  vpc_cidr             = "10.2.0.0/16"
  public_subnet_cidrs  = ["10.2.1.0/24", "10.2.2.0/24"]
  private_subnet_cidrs = ["10.2.11.0/24", "10.2.12.0/24"]
  azs                  = local.azs
  create_igw           = true
  create_nat_gateway   = true
  tags                 = local.common_tags
}

resource "aws_vpc_peering_connection" "hub_to_spoke1" {
  vpc_id      = module.hub_vpc.vpc_id
  peer_vpc_id = module.spoke1_vpc.vpc_id
  auto_accept = true

  tags = merge(local.common_tags, {
    Name = "hub-to-spoke1"
  })
}

resource "aws_vpc_peering_connection" "hub_to_spoke2" {
  vpc_id      = module.hub_vpc.vpc_id
  peer_vpc_id = module.spoke2_vpc.vpc_id
  auto_accept = true

  tags = merge(local.common_tags, {
    Name = "hub-to-spoke2"
  })
}

# Hub routes to spoke1
resource "aws_route" "hub_public_to_spoke1" {
  count = length(module.hub_vpc.public_route_table_ids)

  route_table_id            = module.hub_vpc.public_route_table_ids[count.index]
  destination_cidr_block    = module.spoke1_vpc.vpc_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.hub_to_spoke1.id
}

resource "aws_route" "hub_private_to_spoke1" {
  count = length(module.hub_vpc.private_route_table_ids)

  route_table_id            = module.hub_vpc.private_route_table_ids[count.index]
  destination_cidr_block    = module.spoke1_vpc.vpc_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.hub_to_spoke1.id
}

# Spoke1 routes to hub
resource "aws_route" "spoke1_public_to_hub" {
  count = length(module.spoke1_vpc.public_route_table_ids)

  route_table_id            = module.spoke1_vpc.public_route_table_ids[count.index]
  destination_cidr_block    = module.hub_vpc.vpc_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.hub_to_spoke1.id
}

resource "aws_route" "spoke1_private_to_hub" {
  count = length(module.spoke1_vpc.private_route_table_ids)

  route_table_id            = module.spoke1_vpc.private_route_table_ids[count.index]
  destination_cidr_block    = module.hub_vpc.vpc_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.hub_to_spoke1.id
}

# Hub routes to spoke2
resource "aws_route" "hub_public_to_spoke2" {
  count = length(module.hub_vpc.public_route_table_ids)

  route_table_id            = module.hub_vpc.public_route_table_ids[count.index]
  destination_cidr_block    = module.spoke2_vpc.vpc_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.hub_to_spoke2.id
}

resource "aws_route" "hub_private_to_spoke2" {
  count = length(module.hub_vpc.private_route_table_ids)

  route_table_id            = module.hub_vpc.private_route_table_ids[count.index]
  destination_cidr_block    = module.spoke2_vpc.vpc_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.hub_to_spoke2.id
}

# Spoke2 routes to hub
resource "aws_route" "spoke2_public_to_hub" {
  count = length(module.spoke2_vpc.public_route_table_ids)

  route_table_id            = module.spoke2_vpc.public_route_table_ids[count.index]
  destination_cidr_block    = module.hub_vpc.vpc_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.hub_to_spoke2.id
}

resource "aws_route" "spoke2_private_to_hub" {
  count = length(module.spoke2_vpc.private_route_table_ids)

  route_table_id            = module.spoke2_vpc.private_route_table_ids[count.index]
  destination_cidr_block    = module.hub_vpc.vpc_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.hub_to_spoke2.id
}

module "bastion_sg" {
  source = "../../modules/security-group"

  name        = "bastion-sg"
  description = "Allow SSH from admin IP"
  vpc_id      = module.hub_vpc.vpc_id

  ingress_rules_cidr = [
    {
      description = "SSH from admin IP"
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_ipv4   = var.my_ip
    }
  ]

  tags = local.common_tags
}

module "spoke1_app_sg" {
  source = "../../modules/security-group"

  name        = "spoke1-app-sg"
  description = "Allow SSH only from bastion"
  vpc_id      = module.spoke1_vpc.vpc_id

  ingress_rules_sg = [
    {
      description  = "SSH from bastion SG"
      from_port    = 22
      to_port      = 22
      protocol     = "tcp"
      source_sg_id = module.bastion_sg.security_group_id
    }
  ]

  tags = local.common_tags
}

module "spoke2_app_sg" {
  source = "../../modules/security-group"

  name        = "spoke2-app-sg"
  description = "Allow SSH only from bastion"
  vpc_id      = module.spoke2_vpc.vpc_id

  ingress_rules_sg = [
    {
      description  = "SSH from bastion SG"
      from_port    = 22
      to_port      = 22
      protocol     = "tcp"
      source_sg_id = module.bastion_sg.security_group_id
    }
  ]

  tags = local.common_tags
}

module "bastion_host" {
  source = "../../modules/ec2"

  name                = "hub-bastion"
  ami_id              = data.aws_ami.amazon_linux.id
  instance_type       = "t2.micro"
  subnet_id           = module.hub_vpc.public_subnet_ids[0]
  security_group_ids  = [module.bastion_sg.security_group_id]
  key_name            = var.key_name
  associate_public_ip = true

  user_data = <<-EOF
              #!/bin/bash
              dnf update -y
              dnf install -y htop git
              EOF

  tags = local.common_tags
}

module "spoke1_app" {
  source = "../../modules/ec2"

  name                = "spoke1-private-app"
  ami_id              = data.aws_ami.amazon_linux.id
  instance_type       = "t2.micro"
  subnet_id           = module.spoke1_vpc.private_subnet_ids[0]
  security_group_ids  = [module.spoke1_app_sg.security_group_id]
  key_name            = var.key_name
  associate_public_ip = false

  user_data = <<-EOF
              #!/bin/bash
              dnf update -y
              dnf install -y httpd
              systemctl enable httpd
              systemctl start httpd
              echo "Hello from Spoke1 private server" > /var/www/html/index.html
              EOF

  tags = local.common_tags
}

module "spoke2_app" {
  source = "../../modules/ec2"

  name                = "spoke2-private-app"
  ami_id              = data.aws_ami.amazon_linux.id
  instance_type       = "t2.micro"
  subnet_id           = module.spoke2_vpc.private_subnet_ids[0]
  security_group_ids  = [module.spoke2_app_sg.security_group_id]
  key_name            = var.key_name
  associate_public_ip = false

  user_data = <<-EOF
              #!/bin/bash
              dnf update -y
              dnf install -y nginx
              systemctl enable nginx
              systemctl start nginx
              echo "Hello from Spoke2 private server" > /usr/share/nginx/html/index.html
              EOF

  tags = local.common_tags
}