const Customer = require('../models/customer');
const logger = require("../utils/sample.logger");
const createTcpPool = require("../utils/connect-tcp");
const http = require('http');
const config = require('../../config');
const {PubSub} = require('@google-cloud/pubsub');

const PORT = config.port;
const TABLE = config.tableName;
const PROJECTID = config.projectId; // Your Google Cloud Platform project ID
const TOPICNAME = config.topicName; // Name for the new topic to create Ex: projects/<project_id>>/topics/<topic_name>

let error = ""; // Return error message
let pool; // variable to hold connection pool

// Instantiates a client
const pubSubClient = new PubSub({PROJECTID});

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
    pool = await createPoolAndEnsureSchema();
    next();
  } catch (err) {
    logger.error(`An error has occurred while trying to connect: ${err}`);
    return next(err);
  }
};

// Initialize Knex, a Node.js SQL query builder library with built-in connection pooling.
const createPool = () => {
  logger.info(`Creating pool...`);
  // Configure which instance and what database user to connect with.
  // Remember - storing secrets in plaintext is potentially unsafe. Consider using
  // something like https://cloud.google.com/kms/ to help keep secrets secret.
  const knexConfig = { pool: {} };

  // [START cloud_sql_postgres_knex_limit]
  // 'max' limits the total number of concurrent connections this pool will keep. Ideal
  // values for this setting are highly variable on app design, infrastructure, and database.
  knexConfig.pool.max = 5;
  // 'min' is the minimum number of idle connections Knex maintains in the pool.
  // Additional connections will be established to meet this value unless the pool is full.
  knexConfig.pool.min = 5;
  // [END cloud_sql_postgres_knex_limit]

  // [START cloud_sql_postgres_knex_timeout]
  // 'acquireTimeoutMillis' is the number of milliseconds before a timeout occurs when acquiring a
  // connection from the pool. This is slightly different from connectionTimeout, because acquiring
  // a pool connection does not always involve making a new connection, and may include multiple retries.
  // when making a connection
  knexConfig.pool.acquireTimeoutMillis = 60000; // 60 seconds
  // 'createTimeoutMillis` is the maximum number of milliseconds to wait trying to establish an
  // initial connection before retrying.
  // After acquireTimeoutMillis has passed, a timeout exception will be thrown.
  knexConfig.createTimeoutMillis = 30000; // 30 seconds
  // 'idleTimeoutMillis' is the number of milliseconds a connection must sit idle in the pool
  // and not be checked out before it is automatically closed.
  knexConfig.idleTimeoutMillis = 600000; // 10 minutes
  // [END cloud_sql_postgres_knex_timeout]

  // [START cloud_sql_postgres_knex_backoff]
  // 'knex' uses a built-in retry strategy which does not implement backoff.
  // 'createRetryIntervalMillis' is how long to idle after failed connection creation before trying again
  knexConfig.createRetryIntervalMillis = 200; // 0.2 seconds
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
  return createTcpPool(knexConfig);
};

const ensureSchema = async (dbPool) => {
  const hasTable = await dbPool.schema.hasTable(TABLE);
  if (!hasTable) {
    return dbPool.schema.createTable(TABLE, (table) => {
      table.increments("id").primary();
      table.specificType("firstName", "CHAR(6)").notNullable();
      table.specificType("lastName", "CHAR(6)").notNullable();
      table.specificType("dateOfBirth", "CHAR(6)").notNullable();
    });
  }
  logger.info(`Ensured that table ${TABLE} exists`);
};

const createPoolAndEnsureSchema = async () =>
  createPool()
    .then(async (dbPool) => {
      await ensureSchema(dbPool);
      return dbPool;
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });

const insertIntoTable = async (customer) => {
  pool = pool || await createPoolAndEnsureSchema();
  try {
    await pool.insert([{
      'first_name': customer.firstName,
      'last_name': customer.lastName,
      'date_of_birth': customer.dateOfBirth
      }]).into(TABLE).returning('id').then(function (id){
        customer.id = id[0]["id"];
      });
  } catch (err) {
    throw {
      name: 'SQL Error',
      message: err
    }
  }

}

/**
 * Server endpoint that shows the secret form  whenever a client hits
 * GET / (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express request object
 */
const homeView = async (req, res) => {
  res.render("index");
};

/**
 * Server endpoint that shows the data form  whenever a client hits
 * GET /cmd (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express request object
 */
 const getCommandPage = async (req, res) => {
  try {
    pool = pool || await createPoolAndEnsureSchema();
    res.render("command");
  } catch (err) {
    logger.error(`An error has occurred: ${err}`);
    error = err.message;
    res.render("command", {
      message: "Failed to connect to db",
      error: error,
    });
  }
};

/**
 * Do a request with options provided.
 *
 * @param {Object} options
 * @param {Object} data
 * @return {Promise} a promise of request
 */
 async function doRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {

      res.setEncoding('utf8');
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        if (res.statusCode != 200) {
          return reject(new Error(`statusCode=${res.statusCode} ${responseBody}`));
        }
        return resolve(responseBody);
      });
    });

    req.on('error', (err) => {
      // Sanitize error message
      const sanitizedErrorMessage = err.message.toString().replace(/[\n\r]/g, '');

      // Log sanitized error message
      logger.error(`Request error: ${sanitizedErrorMessage}`);

      // Return sanitized error message in the reject callback
      return reject(sanitizedErrorMessage);
    });

    req.write(data)
    req.end();
  });
}

/**
 * Publish a message with the provided customer
 *
 * @param {Object} customer
 */
async function publishMessage(customer) {
  const data = JSON.stringify(customer);
  try {
    logger.info(`Publishing message to ${TOPICNAME} started...`);
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
    logger.info(`Publishing message ${data} ...`);
    const messageId = await pubSubClient
        .topic(TOPICNAME)
        .publishMessage({data: dataBuffer});

    logger.info(`Message ${messageId} published.`);
  } catch (err) {
    error += `${err.message} <br>`;
    logger.error(`An error occurred while publishing: ${err.message}`);
  }
}

/**
 * Server endpoint that creates a new customer
 * POST /cmd (e.g. localhost:8080/command)
 * @param req Express request object
 * @param res Express request object
*/

const createCmdCustomer = async (req, res) => {
  try{
      req.body.id = null;
      let postData = JSON.stringify(req.body);

      const options = {
        hostname: 'localhost',
        port: PORT,
        path: '/customers',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': postData.length
        },
      };

      let customer;
      await doRequest(options, postData).then((response) => {
        logger.info('Customer inserted into db successfully!');
        logger.info(`Response: ${response}`);
        customer = new Customer(JSON.parse(response));
      });

      await publishMessage(customer);
      res.render("command", {
        message: "Customer created successfully:",
        result: `Created customer: ${JSON.stringify(customer)}`,
      });

  } catch (err) {
      error = err.message;
      res.render("command", {
        message: "Failed to create customer!",
        error: error,
      });
      logger.error(`Failed to create customer: ${err}`);
  }
}



module.exports = { initializePool, insertIntoTable, homeView, getCommandPage, createCmdCustomer };