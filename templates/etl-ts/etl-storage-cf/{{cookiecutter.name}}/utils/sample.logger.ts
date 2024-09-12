import { createLogger, format, transports } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const loggingWinston = new LoggingWinston({
    defaultCallback: (err: Error | null) => {
        if (err) {
            console.log('Error occurred DefaultCallback: ' + err);
        }
    },
});

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.sssZ' }),
        format.json()
    ),
    transports: [
        loggingWinston as any
    ]
});

export default logger;