'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const config = require('../config');
const secretManager = require('./utils/secret-manager');
const logger = require('./utils/sample.logger');

const server = express();
const swaggerUi = require('swagger-ui-express');
//Path of Swagger file
const swaggerSpec = require('../../api/example.oas3.json');

const { initialize } = require('unleash-client');
// Initialize the Unleash instance
// Feature flag toggles are refreshed every 15000ms by default
(async function(){
    // Ex: projects/123456789/secrets/sample-secret-id/versions/version-number
    logger.info("Connecting to Unleash");

    const secretName = `projects/${config.projectId}/secrets/${config.unleash_client_secret_name}/versions/latest`;
    const authToken = await secretManager.getSecret(secretName);
    const unleash = initialize({
        url: config.unleash_api_url,
        appName: 'unleash-client-demo',
        instanceId: 'demo-instance',
        customHeaders: { Authorization: new TextDecoder('utf-8').decode(authToken.payload.data) },
    });

    // Setting the unleash instance to a global variable within the app after it has synchronized with the unleash API
    unleash.on('synchronized', () => {
        server.set('unleash', unleash);
        logger.info(`Unleash is synchronized`)
    })
    unleash.on('error', (error) => logger.error(error.message));
    unleash.on('warn', (warn) => logger.warn(warn));
    // Emitted each time the client gets new toggle state that differes from the local state
    unleash.on('changed', () => {
        logger.info(`Flag has changed: ${unleash.isEnabled(config.unleash_flag_name)}`);
    });
})()


server.use(express.json()); // Parse incoming requests body and append data to req.body
server.use(express.urlencoded({extended: false})); // Parse URL-encoded bodies

server.use(cors(config.cors));

server.set('view engine', 'ejs'); // Set ejs template
server.set("views", path.join(__dirname, "views"));

// Health check route
server.use('/', require('./routes/healthcheck.route'));

server.use('/', require('./routes/logging.route'));
server.use('/', require('./routes/demoApi.route'));
server.use('/', require('./routes/unleash.route'));

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = server;
