/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 06-27-2022
Description: This class demonstrates how to create a connection pool to
the db over TCP
===========================================================================
*/

package com.telus.samples.tcp;

import javax.sql.DataSource;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class TcpController {
    private TcpController() {

    }

    public static DataSource createConnectionPool(String dbUser, String dbPass, String dbHost, 
        String dbPort, String dbName) {
        // The configuration object specifies behaviors for the connection pool.
        HikariConfig config = new HikariConfig();

        // The following URL is equivalent to setting the config options below:
        // jdbc:postgresql://<INSTANCE_HOST>:<DB_PORT>/<DB_NAME>?user=<DB_USER>&password=<DB_PASS>
        // See the link below for more info on building a JDBC URL for the Cloud SQL JDBC Socket Factory
        // https://github.com/GoogleCloudPlatform/cloud-sql-jdbc-socket-factory#creating-the-jdbc-url

        // Configure which instance and what database user to connect with.
        config.setDriverClassName(org.postgresql.Driver.class.getName());
        config.setJdbcUrl(String.format("jdbc:postgresql://%s:%s/%s", dbHost, dbPort, dbName));
        config.setUsername(dbUser); // e.g. "root", "postgres"
        config.setPassword(dbPass); // e.g. "my-password"

        // [END cloud_sql_postgres_servlet_connect_tcp]
        
        // (OPTIONAL) Configure SSL certificates
        // For deployments that connect directly to a Cloud SQL instance without
        // using the Cloud SQL Proxy, configuring SSL certificates will ensure the
        // connection is encrypted.
        // See the link below for more information on how to configure SSL Certificates for use with
        // the Postgres JDBC driver
        // https://jdbc.postgresql.org/documentation/head/ssl-client.html
        // if (SSL_CLIENT_KEY_PATH != null && SSL_SERVER_CA_PATH != null) {
        // config.addDataSourceProperty("ssl", "true");
        // config.addDataSourceProperty("sslmode", "verify-full");

        // config.addDataSourceProperty("sslkey", SSL_CLIENT_KEY_PATH);
        // config.addDataSourceProperty("sslpassword", SSL_CLIENT_KEY_PASSWD);
        // config.addDataSourceProperty("sslrootcert", SSL_SERVER_CA_PATH);
        // }
        // [START cloud_sql_postgres_servlet_connect_tcp]

        // ... Specify additional connection properties here.
        // [START_EXCLUDE]
        //configureConnectionPool(config);

        // [START cloud_sql_postgres_servlet_limit]
        // maximumPoolSize limits the total number of concurrent connections this pool will keep. Ideal
        // values for this setting are highly variable on app design, infrastructure, and database.
        config.setMaximumPoolSize(5);
        // minimumIdle is the minimum number of idle connections Hikari maintains in the pool.
        // Additional connections will be established to meet this value unless the pool is full.
        config.setMinimumIdle(5);
        // [END cloud_sql_postgres_servlet_limit]

        // [START cloud_sql_postgres_servlet_timeout]
        // setConnectionTimeout is the maximum number of milliseconds to wait for a connection checkout.
        // Any attempt to retrieve a connection from this pool that exceeds the set limit will throw an
        // SQLException.
        config.setConnectionTimeout(60000); // 60 seconds
        // idleTimeout is the maximum amount of time a connection can sit in the pool. Connections that
        // sit idle for this many milliseconds are retried if minimumIdle is exceeded.
        config.setIdleTimeout(600000); // 10 minutes
        // [END cloud_sql_postgres_servlet_timeout]

        // [START cloud_sql_postgres_servlet_backoff]
        // Hikari automatically delays between failed connection attempts, eventually reaching a
        // maximum delay of `connectionTimeout / 2` between attempts.
        // [END cloud_sql_postgres_servlet_backoff]

        // [START cloud_sql_postgres_servlet_lifetime]
        // maxLifetime is the maximum possible lifetime of a connection in the pool. Connections that
        // live longer than this many milliseconds will be closed and reestablished between uses. This
        // value should be several minutes shorter than the database's timeout value to avoid unexpected
        // terminations.
        config.setMaxLifetime(1800000); // 30 minutes
        // [END cloud_sql_postgres_servlet_lifetime]


        // [END_EXCLUDE]

        // Initialize the connection pool using the configuration object.
        return new HikariDataSource(config);
    }
}