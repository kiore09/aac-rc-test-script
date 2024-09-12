/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-12-2022
Description: This service is part of the graphQL template, create a DB Connection
and manage queries.
===========================================================================
*/

/* eslint-disable camelcase */
const logger = require('../utils/sample.logger');
const createTcpPool = require('../utils/connect-tcp');
let pool; // variable to hold connection pool

/**
 * Set up a variable to hold our connection pool. It would be safe to
 * initialize this right away, but we defer its instantiation to ease
 * testing different configurations.
 * @param {*} next
 * @returns
 */
const initializePool = async (req, res, next) => {
  if (pool) {
    return next();
  }
  try {
    pool = await createPool();
    next();
  } catch (err) {
    logger.error(`An error has occurred while trying to connect: ${err}`);
    return next(err);
  }
};
// initializePool();
// Initialize Knex, a Node.js SQL query builder library with built-in connection pooling.
const createPool = () => {
  // Configure which instance and what database user to connect with.
  // Remember - storing secrets in plaintext is potentially unsafe. Consider using
  // something like https://cloud.google.com/kms/ to help keep secrets secret.
  const config = {pool: {}};

  // [START cloud_sql_postgres_knex_limit]
  // 'max' limits the total number of concurrent connections this pool will keep. Ideal
  // values for this setting are highly variable on app design, infrastructure, and database.
  config.pool.max = 5;
  // 'min' is the minimum number of idle connections Knex maintains in the pool.
  // Additional connections will be established to meet this value unless the pool is full.
  config.pool.min = 5;
  // [END cloud_sql_postgres_knex_limit]

  // [START cloud_sql_postgres_knex_timeout]
  // 'acquireTimeoutMillis' is the number of milliseconds before a timeout occurs when acquiring a
  // connection from the pool. This is slightly different from connectionTimeout, because acquiring
  // a pool connection does not always involve making a new connection, and may include multiple retries.
  // when making a connection
  config.pool.acquireTimeoutMillis = 60000; // 60 seconds
  // 'createTimeoutMillis` is the maximum number of milliseconds to wait trying to establish an
  // initial connection before retrying.
  // After acquireTimeoutMillis has passed, a timeout exception will be thrown.
  config.createTimeoutMillis = 30000; // 30 seconds
  // 'idleTimeoutMillis' is the number of milliseconds a connection must sit idle in the pool
  // and not be checked out before it is automatically closed.
  config.idleTimeoutMillis = 600000; // 10 minutes
  // [END cloud_sql_postgres_knex_timeout]

  // [START cloud_sql_postgres_knex_backoff]
  // 'knex' uses a built-in retry strategy which does not implement backoff.
  // 'createRetryIntervalMillis' is how long to idle after failed connection creation before trying again
  config.createRetryIntervalMillis = 200; // 0.2 seconds
  // [END cloud_sql_postgres_knex_backoff]
  // if (con.dbHost) {
  //   // Use a TCP socket when INSTANCE_HOST (e.g., 127.0.0.1) is defined
  //   return createTcpPool(config);
  // } else if (dbInstance) {
  //   // Use a Unix socket when INSTANCE_UNIX_SOCKET (e.g., /cloudsql/proj:region:instance) is defined.
  //   return createUnixSocketPool(config);
  // } else {
  //   throw "One of Host or DB Instance ` is required.";
  // }
  return createTcpPool(config);
};

const testDBConnection = async () => {
    logger.info('Testing db connection');
    await pool.raw('select 1+1 as result')
}


/**
 *
 * @param {*} limit
 * @param {*} skip
 * @param {*} sort_field
 * @param {*} sort_order
 * @returns
 */
const getCustomersFromDB = async (
    limit,
    skip,
    sort_field,
    sort_order,
) => {
  // get data from database
  try {
    // Query the 'item' table from the database.
    logger.info('Getting data from database...');
    return await pool
        .select(sort_field)
        .from('customer')
        .orderBy(sort_order)
        .offset(skip)
        .limit(limit);
  } catch (err) {
    logger.error(`An error has occurred: ${err}`);
    error = err.message;
  }
};
/**
 *
 * @param {*} id
 * @returns
 */
const getCustomerFromDB = async (id) => {
  // get data from database
  try {
    // Query the 'item' table from the database.
    logger.info('Getting data from database...');
    return await pool.select('*').from('customer').where('id', id).first();
  } catch (err) {
    logger.error(`An error has occurred: ${err}`);
    error = err.message;
  }
};
/**
 *
 * @param {*} limit
 * @param {*} skip
 * @param {*} sort_field
 * @param {*} sort_order
 * @returns
 */
const getItemsFromDB = async (
    limit,
    skip,
    sort_field,
    sort_order,
) => {
  // get data from database
  try {
    // Query the 'item' table from the database.
    logger.info('Getting data from database...');
    return await pool
        .select(sort_field)
        .from('item')
        .orderBy(sort_order)
        .offset(skip)
        .limit(limit);
  } catch (err) {
    logger.error(`An error has occurred: ${err}`);
    error = err.message;
  }
};
/**
 *
 * @param {*} id
 * @returns
 */
const getItemFromDB = async (id) => {
  // get data from database
  try {
    // Query the 'item' table from the database.
    logger.info('Getting data from database...');
    return await pool.select('*').from('item').where('id', id).first();
  } catch (err) {
    logger.error(`An error has occurred: ${err}`);
    error = err.message;
  }
};
/**
 *
 * @param {*} limit
 * @param {*} skip
 * @param {*} sort_field
 * @param {*} sort_order
 * @returns
 */
const getOrdersFromDB = async (
    limit,
    skip,
    sort_field,
    sort_order,
) => {
  // get data from database
  try {
    // Query the 'item' table from the database.
    logger.info('Getting data from database...');
    return await pool
        .select(sort_field)
        .from('order')
        .orderBy(sort_order)
        .offset(skip)
        .limit(limit);
  } catch (err) {
    logger.error(`An error has occurred: ${err}`);
    error = err.message;
  }
};
/**
 *
 * @param {*} id
 * @returns
 */
const getOrderFromDB = async (id) => {
  // get data from database
  try {
    // Query the 'item' table from the database.
    logger.info('Getting data from database...');
    return await pool
        .select('*')
        .from('order')
        .where('Id', id)
        .first();
  } catch (err) {
    logger.error(`An error has occurred: ${err}`);
  }
};
module.exports = {
  testDBConnection,
  getCustomersFromDB,
  getCustomerFromDB,
  getItemsFromDB,
  getItemFromDB,
  getOrdersFromDB,
  getOrderFromDB,
  initializePool,
};
