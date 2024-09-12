/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-08-2022
Description: Class that configures the Postgres database connection pool.
DAOs have access to database connections via a getter.
===========================================================================
*/
package com.telus.samples.postgres;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.telus.samples.utils.SecretManagerAccess;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Service
public class PostgresService {

    private static final Logger logger = LoggerFactory.getLogger(PostgresService.class);

    // Connection pool for database queries
    private DataSource pool;

    // The configuration object specifies behaviors for the connection pool.
    private static HikariConfig CONFIG = new HikariConfig();

    private String dbName;
    private String dbHost;
    private String dbPort;
    
    /**
     * Initializes the connection pool to the Postgres database
     */
    @Autowired
    public PostgresService(
    	    SecretManagerAccess secretManagerAccess,
            @Value("${example.graphql.dbName}") String dbName,
            @Value("${example.graphql.dbHost}") String dbHost,
            @Value("${example.graphql.dbPort}") String dbPort) {

        this.dbName = dbName;
        this.dbHost = dbHost;
        this.dbPort = dbPort;

        try {
            // Configuring the DataSource object

            // Remember - storing secrets in plaintext is potentially unsafe. Consider using
            // something like https://cloud.google.com/kms/ to help keep secrets secret.
            logger.info("Retrieving db secrets");
            String username = secretManagerAccess.getUsername();
            String password = secretManagerAccess.getPassword();

            // The following URL is equivalent to setting the config options below:
            // jdbc:postgresql://<INSTANCE_HOST>:<DB_PORT>/<DB_NAME>?user=<DB_USER>&password=<DB_PASS>
            // See the link below for more info on building a JDBC URL for the Cloud SQL JDBC Socket Factory
            // https://github.com/GoogleCloudPlatform/cloud-sql-jdbc-socket-factory#creating-the-jdbc-url

            // Configure which instance and what database user to connect with.
            PostgresService.CONFIG.setDriverClassName(org.postgresql.Driver.class.getName());
            PostgresService.CONFIG.setJdbcUrl(String.format("jdbc:postgresql://%s:%s/%s", this.dbHost, this.dbPort, this.dbName));
            PostgresService.CONFIG.setUsername(username);
            PostgresService.CONFIG.setPassword(password);

            // maximumPoolSize limits the total number of concurrent connections this pool will keep. Ideal
            // values for this setting are highly variable on app design, infrastructure, and database.
            PostgresService.CONFIG.setMaximumPoolSize(2);

            // minimumIdle is the minimum number of idle connections Hikari maintains in the pool.
            // Additional connections will be established to meet this value unless the pool is full.
            PostgresService.CONFIG.setMinimumIdle(2);

            // setConnectionTimeout is the maximum number of milliseconds to wait for a connection checkout.
            // Any attempt to retrieve a connection from this pool that exceeds the set limit will throw an
            // SQLException.
            PostgresService.CONFIG.setConnectionTimeout(60000); // 60 seconds
            
            // idleTimeout is the maximum amount of time a connection can sit in the pool. Connections that
            // sit idle for this many milliseconds are retried if minimumIdle is exceeded.
            PostgresService.CONFIG.setIdleTimeout(600000); // 10 minutes

            // maxLifetime is the maximum possible lifetime of a connection in the pool. Connections that
            // live longer than this many milliseconds will be closed and reestablished between uses. This
            // value should be several minutes shorter than the database's timeout value to avoid unexpected
            // terminations.
            PostgresService.CONFIG.setMaxLifetime(1800000); // 30 minutes

            logger.info("Creating db pool connection: {}", this.dbName);
            pool = new HikariDataSource(PostgresService.CONFIG);    // Initialize the connection pool using the configuration object.
            testPostgres();
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
        }
    }
    
    /**
     * Get a connection from the pool
     * 
     * @return An object representing a connection to the database
     * @throws SQLException
     */
    public Connection getConnection() throws SQLException{
    	return this.pool.getConnection();
    }

    /**
     * Test method to confirm that there is a working connection to the database on startup
     */
    private void testPostgres() {
        try (Connection con = pool.getConnection()) {
            DatabaseMetaData dbm = con.getMetaData();
            // Check if tableName table exists in the db
            if (dbm.getTables(null, null, "customer", null).next()){
                logger.info("Table {} exists", "customer");
            } else {
                logger.error("Table {} does not exist", "customer");
            }
        } catch (Exception ex) {
            // Exception occurred, notify user
            logger.error(ex.getMessage(), ex);
        }
    }
}