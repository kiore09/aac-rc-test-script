const {createLogger} = require('winston');
const config = require('../../config');

const logger = createLogger(config.logging);

module.exports = logger;
