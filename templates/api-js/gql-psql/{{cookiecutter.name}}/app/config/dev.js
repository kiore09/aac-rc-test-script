const {format, transports} = require('winston');

module.exports = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  logging: {
    format: format.combine(
        format.timestamp(new Date().toISOString()),
        format.json(),
    ),
    transports: [new transports.Console()],
  },
  projectId: process.env.PROJECT_ID,
  dbUser: process.env.SECRET_DB_USER,
  dbKeyName: process.env.SECRET_DB_NAME,
  database: process.env.DATABASE,
  dbHost: process.env.DB_HOST,
};
