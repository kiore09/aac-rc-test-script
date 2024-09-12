resource "google_pubsub_topic" "sample-topic-{{cookiecutter.name}}" {
  name                       = "{{cookiecutter.edaSubscriber.edaTopic}}"
  project                    = var.project_id
  message_retention_duration = "86400s" # 1 Day
  message_storage_policy {
    allowed_persistence_regions = [
      var.region
    ]
  }
}

// Sample Pull Subscription
resource "google_pubsub_subscription" "sample-pull-sub-{{cookiecutter.name}}" {
  name  = "{{cookiecutter.edaSubscriber.edaPullSubscription}}"
  topic = "google_pubsub_topic.sample-topic-{{cookiecutter.name}}.name"
  project = var.project_id

  # 20 minutes
  message_retention_duration = "1200s"
  retain_acked_messages      = true
  ack_deadline_seconds = 20
  expiration_policy {
    ttl = "300000.5s"
  }
  retry_policy {
    minimum_backoff = "10s"
  }
  enable_message_ordering    = false
}