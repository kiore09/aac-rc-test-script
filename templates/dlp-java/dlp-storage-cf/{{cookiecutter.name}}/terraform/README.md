## Terraform files for the project

The ***'storage-{{cookiecutter.name}}.tf'*** file has been generated for provisioning three Cloud Storage buckets for testing purposes. The ***'dlp_infra.tf'*** and
***'dlp_srv.tf'*** files have been added for configuring app engine and dlp-api service account roles respectively.

Before attempting to execute the sample cloud function, if you haven't already provisioned the storage buckets to your GCP Project, copy the 'storage-{{cookiecutter.name}}.tf', 'dlp_infra.tf', and 'dlp_srv.tf' files to the *terraform* folder in the **tf-infra** repository for you GCP Project and follow the instructions provided [here](https://simplify.telus.com/docs/developer-docs/docs/topics/applying-terraform-configuration-in-gcp-6e4wBLR5Je9aP5Vd8y70vA.md).

### GCP Resource Deployment Tutorial Video

View this tutorial video on how to [Provision GCP Resources using Terraform](https://drive.google.com/file/d/1W0vaGDTZoZqCNUXHFZnekFY89rmcnqOY/view?usp=sharing)