module "cdo-{{ cookiecutter.primavera.dnsName }}" {
  source       = "git::ssh://git@github.com/telus/tf-module-gcp-dns-entry?ref=v0.0.3"
  project_id   = var.project_id
  managed_zone = module.dns-zone.name
  dns_name     = module.dns-zone.dns_name
  type         = "CNAME"
  name         = "{{ cookiecutter.primavera.dnsName }}"
  # For the cname, refer to the terraform references here: https://github.com/telus/cio-cloudapps-dns#established-a-records
  cname        = module.dns-entry-{{ cookiecutter.primavera.aRecordName }}.name
}