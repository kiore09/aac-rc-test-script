module "cloud_storage" {
  source          = "git::ssh://git@github.com/telus/tf-module-gcp-storage?ref=v1.1.0"
  project_id      = var.project_id
  bucket_name    = "{{cookiecutter.etlStorageCf.sourceBucket}}_${var.env}"
  versioning_enabled = false
  force_destroy_enabled = false
  storage_class   = "REGIONAL"
  # action_type can be "Delete" or "SetStorageClass"
  lifecycle_rules = [{
    action_type = "Delete",
    condition_age = 30
  }]
}

module "cloud_storage" {
  source          = "git::ssh://git@github.com/telus/tf-module-gcp-storage?ref=v1.1.0"
  project_id      = var.project_id
   bucket_name    = "{{cookiecutter.etlStorageCf.targetBucket}}_${var.env}"
  versioning_enabled = false
  force_destroy_enabled = false
  storage_class   = "REGIONAL"
  # action_type can be "Delete" or "SetStorageClass"
  lifecycle_rules = [{
    action_type = "Delete",
    condition_age = 30
  }]
}