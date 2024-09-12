# Grant viewer role to DLP service agent
# https://cloud.google.com/dlp/docs/iam-permissions#service_account 

resource "google_project_iam_member" "set_viewer_role" {
  project  =  var.project_id 
  role =  "roles/viewer"
  member   = "serviceAccount:service-${var.project_number}@dlp-api.iam.gserviceaccount.com" 
} 