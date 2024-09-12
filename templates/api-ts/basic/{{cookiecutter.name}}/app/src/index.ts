import server from './server';
import dotenv from 'dotenv';
import logger from './utils/sample.logger';
import config from './config';

dotenv.config();

const PORT: number = config.port;

//Initialize Server
server.listen(PORT, () => {
    logger.info(`Application running at ${config.host}:${PORT}`);
}).on('error', (err: Error) => {
    logger.error('Error happened:', err.message);
});
