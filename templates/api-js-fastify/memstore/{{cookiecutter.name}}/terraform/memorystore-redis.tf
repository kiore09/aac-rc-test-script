resource "google_redis_instance" "{{ cookiecutter.memstore.redisName }}" {
  region                  = var.region
  location_id             = "northamerica-northeast1-b"
  project                 = var.project_id
  name                    = "{{ cookiecutter.memstore.redisName }}"
  display_name            = "{{ cookiecutter.memstore.redisName }}"
  tier                    = "STANDARD_HA"
  authorized_network      = var.shared_vpc_network
  connect_mode            = "PRIVATE_SERVICE_ACCESS"
  redis_version           = "REDIS_5_0"
  redis_configs           = { "maxmemory-policy" = "allkeys-lru" }
  secondary_ip_range      = "auto"
  read_replicas_mode      = "READ_REPLICAS_ENABLED"
  replica_count           = 1
  memory_size_gb          = 5
}