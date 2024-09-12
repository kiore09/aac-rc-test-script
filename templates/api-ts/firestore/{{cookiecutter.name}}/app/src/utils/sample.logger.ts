import { createLogger, Logger } from 'winston';
import config from '../config';

const logger: Logger = createLogger(config.logging);

export default logger;
