/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 20-08-2024
Description: This file is part of the postgreSQL template, create a DB connection
using credentials stored in Secret Manager.
===========================================================================
*/

"use strict";
// [START cloud_sql_postgres_knex_connect_tcp]
// [START cloud_sql_postgres_knex_connect_tcp_sslcerts]
import { Knex, knex } from "knex";
import config from "../config";
import { getSecret } from "./secret-manager";
import logger from "../utils/sample.logger";

interface SecretVersion {
  payload: {
    data: Uint8Array;
  };
}

/**
 * Function that calls GCP secret manager method: accessSecretVersion() to retrieve secret
 * @param req Express request object
 * @param res Express request object
 */
const getSecretValue = async (secret: string): Promise<string> => {
  const secretName: string = `projects/${config.projectId}/secrets/${secret}/versions/latest`; // Ex: projects/123456789/secrets/sample-secret-id/versions/version-number
  try {
    const version: SecretVersion = await getSecret(secretName);
    // Decode secret value
    return new TextDecoder("utf-8").decode(version.payload.data);
  } catch (error) {
    logger.error(`An Error Occurred: ${error}`);
  }
};

// createTcpPool initializes a TCP connection pool for a Cloud SQL
// instance of Postgres.
const createTcpPool = async (
  additional: any
): Promise<Knex<any, unknown[]>> => {
  // Extract host and port from socket address
  const dbSocketAddr: string = config.dbHost.split(":"); // e.g. '127.0.0.1:5432'
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const dbUser: string = await getSecretValue(config.dbUser); // get database username
  logger.info(`Retrieving database username...`);
  const dbPass: string = await getSecretValue(config.dbKeyName); // get database password
  logger.info(`Retrieving database password...`);
  const dbConfig: Knex.Config = {
    client: "pg", // e.g. 'pg' for Postgresql, 'mysql' for MySQL
    connection: {
      user: dbUser, // e.g. 'db-user'
      password: dbPass, // e.g. 'db-password'
      database: config.database, // e.g. 'database'
      host: dbSocketAddr[0], // e.g. '127.0.0.1'
      port: dbSocketAddr[1], // e.g. '5432'
    },
    // ... Specify additional properties here.
    ...additional,
  };
  // [END cloud_sql_postgres_knex_connect_tcp]

  // [START cloud_sql_postgres_knex_connect_tcp]
  // Establish a connection to the database.
  return knex(dbConfig);
};
// [END cloud_sql_postgres_knex_connect_tcp]
export { createTcpPool };
