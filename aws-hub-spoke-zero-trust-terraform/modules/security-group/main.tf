resource "aws_security_group" "this" {
  name        = var.name
  description = var.description
  vpc_id      = var.vpc_id

  tags = merge(var.tags, {
    Name = var.name
  })
}

resource "aws_vpc_security_group_ingress_rule" "ingress_cidr" {
  for_each = {
    for idx, rule in var.ingress_rules_cidr : idx => rule
  }

  security_group_id = aws_security_group.this.id
  cidr_ipv4         = each.value.cidr_ipv4
  from_port         = each.value.from_port
  to_port           = each.value.to_port
  ip_protocol       = each.value.protocol
  description       = each.value.description
}

resource "aws_vpc_security_group_ingress_rule" "ingress_sg" {
  for_each = {
    for idx, rule in var.ingress_rules_sg : idx => rule
  }

  security_group_id            = aws_security_group.this.id
  referenced_security_group_id = each.value.source_sg_id
  from_port                    = each.value.from_port
  to_port                      = each.value.to_port
  ip_protocol                  = each.value.protocol
  description                  = each.value.description
}

resource "aws_vpc_security_group_egress_rule" "egress_all" {
  count = var.allow_all_egress ? 1 : 0

  security_group_id = aws_security_group.this.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
  description       = "Allow all outbound"
}