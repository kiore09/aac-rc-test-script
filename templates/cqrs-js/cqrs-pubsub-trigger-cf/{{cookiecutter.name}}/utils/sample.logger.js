const {createLogger, format, transports} = require ('winston');
// Imports the Google Cloud client library for Winston
const {LoggingWinston} = require('@google-cloud/logging-winston');

const loggingWinston = new LoggingWinston({
    defaultCallback: err => {
        if (err) {
          console.log('Error occurred: ' + err);
        }
    },
})

const logger = createLogger({
    format: format.combine(
        format.timestamp(new Date().toISOString()),
        format.json()
    ),
    transports: [
        loggingWinston
    ],
});

module.exports = logger;