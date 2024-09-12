import { createLogger, format, transports } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const loggingWinston = new LoggingWinston({
  defaultCallback: err => {
    if (err) {
      console.log('Error occurred: ' + err);
    }
  },
});

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  transports: [
    loggingWinston,
  ],
});

export default logger;
