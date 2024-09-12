module "firestore" {
  source        = "git::ssh://git@github.com/telus/tf-module-gcp-firestore.git?ref=v1.0.1"
  project_id    = var.project_id
  region        = var.region
  database_type = "CLOUD_FIRESTORE" 
}

locals {
    current_timestamp  = timestamp()
    doc_format = formatdate("YYYYMMDD-HHmmss", local.current_timestamp)
}

resource "google_firestore_document" "sample-document-{{cookiecutter.name}}" {
  project     = var.project_id
  collection  = "{{cookiecutter.cqrsQuery.firestoreCollection}}"
  document_id = "doc-$(locals.doc_format)"
  fields      = "{\"sampledoc\":{\"mapValue\":{\"fields\":{\"created_by\":{\"stringValue\":\"terraform\"}}}}}"
}