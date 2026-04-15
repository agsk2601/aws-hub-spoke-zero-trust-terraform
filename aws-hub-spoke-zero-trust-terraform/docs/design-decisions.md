# Design Decisions

## 1. Hub-and-Spoke Topology
A hub-and-spoke design was selected to centralize administrative access and simplify segmentation between workloads.

## 2. Bastion-Based Access
A bastion host was placed in the Hub VPC public subnet to provide controlled administrative access to private EC2 instances in the spoke VPCs.

## 3. Public and Private Subnets
Each VPC includes:
- Public subnets for internet-facing resources
- Private subnets for internal workloads

This aligns with common enterprise cloud networking patterns.

## 4. NAT Gateway
NAT Gateway was chosen to allow private workloads to access outbound internet for updates and package installation without assigning public IPs.

## 5. VPC Peering
VPC peering was used for direct hub-to-spoke connectivity in this version of the project. In larger enterprise designs, Transit Gateway would be preferred.

## 6. Modular Terraform Structure
The project uses reusable modules for:
- VPC
- Security Groups
- EC2

This improves scalability, readability, and reuse across environments.

## 7. Zero Trust-Inspired Access
The design follows a least-privilege approach:
- Bastion SSH allowed only from admin public IP
- Private servers accessible only from the bastion security group
- No public IPs assigned to app instances