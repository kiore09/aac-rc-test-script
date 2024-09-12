module.exports = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost',
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  projectId: process.env.PROJECT_ID,
  topicName: process.env.TOPIC_NAME,
  subscriptionName: process.env.SUBSCRIPTION_NAME
}
