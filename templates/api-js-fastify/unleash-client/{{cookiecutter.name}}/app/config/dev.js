module.exports = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost',
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  unleash_secret_gcpProjectId: process.env.UNLEASH_SECRET_GCP_PROJECT_ID,
  unleash_api_url: process.env.UNLEASH_API_URL,
  unleash_client_secret_name: process.env.UNLEASH_CLIENT_SECRET_NAME,
  unleash_flag_name: process.env.UNLEASH_FLAG_NAME,
  enable_external_services: true,
}
