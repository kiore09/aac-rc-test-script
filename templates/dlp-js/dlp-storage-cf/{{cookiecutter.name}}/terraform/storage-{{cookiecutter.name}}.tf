module "source-bucket-{{cookiecutter.name}}" {
  source          = "git::ssh://git@github.com/telus/tf-module-gcp-storage?ref=v1.1.0"
  project_id      = var.project_id
  bucket_name    = "{{cookiecutter.dlpStorageCf.sourceBucket}}_${var.env}"
  versioning_enabled = false
  force_destroy_enabled = false
  storage_class   = "REGIONAL"
  # action_type can be "Delete" or "SetStorageClass"
  lifecycle_rules = [{
    action_type = "Delete",
    condition_age = 30
  }]
}

module "sensitive-bucket-{{cookiecutter.name}}" {
  source          = "git::ssh://git@github.com/telus/tf-module-gcp-storage?ref=v1.1.0"
  project_id      = var.project_id
  bucket_name    = "{{cookiecutter.dlpStorageCf.sensitiveBucket}}_${var.env}"
  versioning_enabled = false
  force_destroy_enabled = false
  storage_class   = "REGIONAL"
  # action_type can be "Delete" or "SetStorageClass"
  lifecycle_rules = [{
    action_type = "Delete",
    condition_age = 30
  }]
}

module "non-sensitive-bucket-{{cookiecutter.name}}" {
  source          = "git::ssh://git@github.com/telus/tf-module-gcp-storage?ref=v1.1.0"
  project_id      = var.project_id
  bucket_name    = "{{cookiecutter.dlpStorageCf.nonSensitiveBucket}}_${var.env}"
  versioning_enabled = false
  force_destroy_enabled = false
  storage_class   = "REGIONAL"
  # action_type can be "Delete" or "SetStorageClass"
  lifecycle_rules = [{
    action_type = "Delete",
    condition_age = 30
  }]
}