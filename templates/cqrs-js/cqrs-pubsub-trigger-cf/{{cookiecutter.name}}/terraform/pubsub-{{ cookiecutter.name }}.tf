resource "google_pubsub_topic" "sample-topic-{{cookiecutter.name}}" {
  name                       = "{{cookiecutter.cqrsPubsubTriggerCf.cqrsTopic}}"
  project                    = var.project_id
  message_retention_duration = "86400s" # 1 Day
  message_storage_policy {
    allowed_persistence_regions = [
      var.region
    ]
  }
}

