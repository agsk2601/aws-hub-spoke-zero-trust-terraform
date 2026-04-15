variable "name" {
  type = string
}

variable "description" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "ingress_rules_cidr" {
  type = list(object({
    description = string
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_ipv4   = string
  }))
  default = []
}

variable "ingress_rules_sg" {
  type = list(object({
    description = string
    from_port   = number
    to_port     = number
    protocol    = string
    source_sg_id = string
  }))
  default = []
}

variable "allow_all_egress" {
  type    = bool
  default = true
}

variable "tags" {
  type    = map(string)
  default = {}
}