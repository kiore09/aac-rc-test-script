module.exports = {
  
    cors: {
        origin: process.env.CORS_ORIGIN || '*'
    },
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
}