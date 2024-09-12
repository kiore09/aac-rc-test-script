const {format, transports} = require("winston");

module.exports = {
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'http://localhost',
    cors: {
        origin: process.env.CORS_ORIGIN || '*'
    },
    logging: {
        format: format.combine(
            format.timestamp(new Date().toISOString()),
            format.json()
        ),
        transports: [ new transports.Console() ]
    },
    projectId: process.env.PROJECT_ID,
    secretName: process.env.SECRET_NAME
}