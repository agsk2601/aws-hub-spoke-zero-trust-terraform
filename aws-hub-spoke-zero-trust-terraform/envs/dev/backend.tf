terraform {
  backend "s3" {
    bucket         = "replace-with-your-terraform-state-bucket"
    key            = "aws-hub-spoke-zero-trust-terraform/dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "replace-with-your-lock-table"
    encrypt        = true
  }
}