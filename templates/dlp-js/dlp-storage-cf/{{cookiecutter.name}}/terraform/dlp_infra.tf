variable "dlp_rolesList" {
  type = list(string)
  default = ["roles/dlp.admin","roles/dlp.serviceAgent"]
}

# Grant DLP permissions to default app engine service account
resource "google_project_iam_member" "set_dlp_roles" {
  project  =  var.project_id 
  count = length(var.dlp_rolesList)
  role =  var.dlp_rolesList[count.index]
  member   = "serviceAccount:${var.project_id }@appspot.gserviceaccount.com"
} 