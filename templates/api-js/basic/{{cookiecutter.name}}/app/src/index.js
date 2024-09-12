const server = require('./server');
require('dotenv').config();
const logger = require('./utils/sample.logger');
const config = require('../config');

const PORT = config.port;

//Initialize Server
server.listen(PORT, (err) => {
    if (err) {
        logger.error(err);
        process.exit(1);
    }
    logger.info(`Application running at ${config.host}:${PORT}`);
});
