/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 07-15-2022
Description: This class demonstrates how to create a connection pool to
the db over TCP
===========================================================================
*/

package com.telus.samples.postgres;

import com.telus.samples.command.Customer;
import com.telus.samples.utils.SecretManagerAccess;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Service
public class PostgresService {

    private static final Logger logger = LoggerFactory.getLogger(PostgresService.class);
    
    private DataSource pool;

     // The configuration object specifies behaviors for the connection pool.
    private static HikariConfig CONFIG = new HikariConfig();

    private String dbName;
    private String dbTableName;
    private String dbHost;
    private String dbPort;

    @Autowired
    private PostgresService(
            SecretManagerAccess secretManagerAccess,
            @Value("${example.cqrsCMD.dbName}") String dbName,
            @Value("${example.cqrsCMD.dbTableName}") String dbTableName,
            @Value("${example.cqrsCMD.dbHost}") String dbHost,
            @Value("${example.cqrsCMD.dbPort}") String dbPort) {

        this.dbName = dbName;
        this.dbTableName = dbTableName;
        this.dbHost = dbHost;
        this.dbPort = dbPort;

        try {
            // Configuring the configuration object

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
            PostgresService.CONFIG.setUsername(username); // e.g. "root", "postgres"
            PostgresService.CONFIG.setPassword(password); // e.g. "my-password"

            // maximumPoolSize limits the total number of concurrent connections this pool will keep. Ideal
            // values for this setting are highly variable on app design, infrastructure, and database.
            PostgresService.CONFIG.setMaximumPoolSize(5);

            // minimumIdle is the minimum number of idle connections Hikari maintains in the pool.
            // Additional connections will be established to meet this value unless the pool is full.
            PostgresService.CONFIG.setMinimumIdle(5);

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

            pool = createConnectionPool();
            testPostgres();
        } catch (Exception ex) {
            logger.error("Exception caught ", ex);
        }
    }

    /**
     * Inserts a new customer object to be inserted into the database
     * 
     * @param newCustomer customer object to be inserted into the database
     */
    public void insertCustomer(Customer newCustomer) throws Exception {
        if (pool == null) {
            logger.error("Not connected to the database, trying to connect again");
            try {
                pool = createConnectionPool();
            } catch (Exception ex) {
                logger.error("Exception caught ", ex);
                throw new Exception("Error connecting to db");
            }
        }

        try (Connection con = pool.getConnection()) {
            logger.info("Inserting table row");
            String stmt = String.format("INSERT INTO %s (first_name, last_name, date_of_birth) ", this.dbTableName)
                    + String.format("VALUES ('%s', '%s', '%s');", 
                        newCustomer.getFirstName(), newCustomer.getLastName(), newCustomer.getDateOfBirth());
            try (PreparedStatement createTableStatement = con.prepareStatement(stmt, Statement.RETURN_GENERATED_KEYS);) {
                createTableStatement.executeUpdate();
                // Retrieve the auto generated key
                ResultSet keys = createTableStatement.getGeneratedKeys();
                int id; 
                if (keys.next()) {
                    id = keys.getInt(1);
                    newCustomer.setId(id);
                }
                logger.info("Inserted row with id: {}", newCustomer.getId());
            } 
        } catch (Exception ex) {
            // Exception occurred, notify user
            logger.error("Exception caught ", ex);
            throw new Exception("SQL error");
        }
    }

    private DataSource createConnectionPool() {
        logger.info("Creating db pool connection: {}", this.dbName);
        // Initialize the connection pool using the configuration object.
        return new HikariDataSource(PostgresService.CONFIG);
    }

    private void testPostgres() {
        try (Connection con = pool.getConnection()) {
            DatabaseMetaData dbm = con.getMetaData();
            // Check if tableName table exists in the db
            if (dbm.getTables(null, null, this.dbTableName, null).next()){
                logger.info("Table {} exists", this.dbTableName);
            } else {
                logger.error("Table {} does not exist", this.dbTableName);
            }
        } catch (Exception ex) {
            // Exception occurred, notify user
            logger.error("Exception caught ", ex);
        }
    }
}