/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 14-08-2024
Description: Sample controller for adding key-value pairs into a Redis
instance on GCP.
===========================================================================
*/

const config = require('../../config');
const { createClient } = require('redis');
const logger = require('../utils/sample.logger');

const REDISHOST = config.redisHost || 'localhost';
const REDISPORT = config.redisPort || 6379;

let response = null;

const client = createClient({
  url: `redis://${REDISHOST}:${REDISPORT}`,
});

async function connectToRedis() {
  try {
    await client.connect();
    logger.info('Connected to Redis');
  } catch (err) {
    logger.error(`Error connecting to Redis: ${err.message}`);
  }
}

connectToRedis();

const memstore = (req, res) => {
  res.render('memstore', {
    response,
  });
};

// Sanitization functions
function sanitize(input) {
  const sanitized = input.toString().replace(/[\n\r]/g, '').replace(/\s+/g, '').trim();
  if (!/^[a-zA-Z0-9-_]+$/.test(sanitized)) {
    throw new Error('Invalid input');
  }
  return sanitized;
}

const redisData = async (req, res) => {
  try {
    // Log sanitized request body
    const sanitizedBody = { ...req.body };

    // Further validation before storing in Redis
    if (!sanitizedBody.key || !sanitizedBody.value) {
      throw new Error('Missing key or value'); // Ensure both key and value are present
    }

    Object.keys(sanitizedBody).forEach((key) => {
      sanitizedBody[key] = sanitize(req.body[key]);
    });

    // Add a key to Redis
    const safeKey = sanitize(sanitizedBody.key);
    const safeValue = sanitize(sanitizedBody.value);

    await client.set(safeKey, safeValue);
    response = await client.get(safeKey);
    res.render('memstore', {
      response,
    });
  } catch (err) {
    logger.error(`An error occurred while processing the request: ${err.message}`);
    res.render('memstore', {
      response: null,
      error: err.message,
    });
  }
};


module.exports = { memstore, redisData };