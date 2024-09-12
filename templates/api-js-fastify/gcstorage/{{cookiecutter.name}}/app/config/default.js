module.exports = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost',
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  bucketName: process.env.STORAGE_BUCKET,
  projectId: process.env.PROJECT_ID,
}
