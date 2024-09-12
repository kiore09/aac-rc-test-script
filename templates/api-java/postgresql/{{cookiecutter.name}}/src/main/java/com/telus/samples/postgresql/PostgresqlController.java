/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 06-27-2022
Description: This sample controller demonstrates connecting to Cloud SQL
using credentials stored in Secret Manager
===========================================================================
*/
package com.telus.samples.postgresql;


import org.springframework.web.bind.annotation.GetMapping;

import com.telus.samples.tcp.TcpController;
import com.telus.samples.utils.SecretManagerAccess;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
public class PostgresqlController{

    private static final Logger logger = LoggerFactory.getLogger(PostgresqlController.class);

    private DataSource pool;

    private SecretManagerAccess secretManagerAccess;

    // Reads application.properties for db name
    @Value("${example.postgresql.dbName}")
    private String dbName;

    // Reads application.properties for db host
    @Value("${example.postgresql.dbHost}")
    private String dbHost;

    // Reads application.properties for db port
    @Value("${example.postgresql.dbPort}")
    private String dbPort;

    // Stores contacts that are queried from the db
    private ContactsDto contacts = new ContactsDto();

    static final String TABLE_NAME = "contacts";

    static final String EXCEPTION = "Exception caught ";

    static final String EXCDATA = "excdata";

    @Autowired
    public PostgresqlController(SecretManagerAccess secretManagerAccess) {
        this.secretManagerAccess = secretManagerAccess;
    }

    /**
     * GET /postgresql endpoint (e.g. localhost:8080/postgresql) that returns the Postgresql demo webpage template.
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/postgresql")
    public String getSecretPage(Model model) {

        try {
            // Initialize connection to the db
            initializePool();

            // Test the db connection by querying it
            testPostgres(model);

            // Query the db for data and add it to the model
            queryData(model);
        } catch (Exception ex) {
            logger.error(EXCEPTION, ex);
            ex.printStackTrace();
            model.addAttribute(EXCDATA, EXCEPTION + ex.getMessage());
        }

        return "postgresql";    // Serves the postgresql.html template
    }

    private void initializePool() throws IOException {
        if (pool == null) {
            // Remember - storing secrets in plaintext is potentially unsafe. Consider using
            // something like https://cloud.google.com/kms/ to help keep secrets secret.
            logger.info("Retrieving db secrets");
            String dbUser = secretManagerAccess.getUsername();
            String dbPass = secretManagerAccess.getPassword();
            logger.info("Creating db pool connection: {}", dbName);
            pool = TcpController.createConnectionPool(dbUser, dbPass, dbHost, dbPort, dbName);
        }
    }

    private void testPostgres(Model model) {
        try (Connection con = pool.getConnection()) {
            DatabaseMetaData dbm = con.getMetaData();
            // Check if TABLE_NAME table exists in the db
            if (dbm.getTables(null, null, TABLE_NAME, null).next()){
                logger.info("Table {} exists", TABLE_NAME);
            } else {
                // Create TABLE_NAME table
                logger.info("Table does not exist");
                String stmt = String.format("CREATE TABLE IF NOT EXISTS %s ( ", TABLE_NAME)
                    + "id serial, first_name CHAR(6) NOT NULL, last_name CHAR(6) NOT NULL, email CHAR(6) NOT NULL,"
                    + "created_on timestamp, PRIMARY KEY (id) );";
                try (PreparedStatement createTableStatement = con.prepareStatement(stmt);) {
                    createTableStatement.execute();
                    logger.info("Table created");
                }

                // Insert table row
                logger.info("Inserting table row");
                stmt = String.format("INSERT INTO %s (first_name, last_name, email, created_on) ", TABLE_NAME)
                        + "VALUES ('bob', 'joe', 'email', current_timestamp);";
                try (PreparedStatement createTableStatement = con.prepareStatement(stmt);) {
                    createTableStatement.executeUpdate();
                    logger.info("Inserted row");
                } 
            }
        } catch (Exception ex) {
            // Exception occurred, notify user
            logger.error(EXCEPTION, ex);
            model.addAttribute(EXCDATA, "ERROR: Exception caught - " + ex.getMessage());
        }
    }

    private void queryData(Model model) {
        try (Connection con = pool.getConnection()) {
            // Query for data
            logger.info("Querying table");
            String stmt = String.format("Select * from %s;", TABLE_NAME); 

            try (PreparedStatement createTableStatement = con.prepareStatement(stmt);
                 ResultSet rs = createTableStatement.executeQuery()) {
                    while (rs.next()){
                        DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");  

                        int id = rs.getInt("id");
                        String first = rs.getString("first_name");
                        String last = rs.getString("last_name");
                        String email = rs.getString("email");
                        String created = dateFormat.format(rs.getTimestamp("created_on"));

                        Contact newContact = new Contact(id, first, last, email, created);
                        contacts.addContact(newContact); 
                        logger.info(newContact.getString());
                    }
            }
        } catch (Exception ex) {
            // Exception occurred, notify user
            logger.error(EXCEPTION, ex);
            ex.printStackTrace();
            model.addAttribute(EXCDATA, "ERROR: Exception caught - " + ex.getMessage());
        }
        model.addAttribute("contactList", contacts.getContacts());  
    }
}