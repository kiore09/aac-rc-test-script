const config = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || '0.0.0.0',
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
};

export default config;
