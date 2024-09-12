resource "google_pubsub_topic" "sample_pubsub_topic" {
  name                       = "{{cookiecutter.pubsub.topicName}}"
  project                    = var.project_id
  message_retention_duration = "86400s" # 1 Day
  message_storage_policy {
    allowed_persistence_regions = [
      var.region
    ]
  }
}

resource "google_pubsub_subscription" "sample_pubsub_subscription" {
  name  = "{{cookiecutter.pubsub.subscriptionName}}"
  project = var.project_id
  topic = google_pubsub_topic.sample_pubsub_topic.id
}
