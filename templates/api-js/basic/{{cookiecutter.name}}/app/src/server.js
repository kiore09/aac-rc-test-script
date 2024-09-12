'use strict';
const express = require('express');
const cors = require('cors');
const config = require('../config');
const path = require("path");
const server = express();
const swaggerUi = require('swagger-ui-express');
//Path of Swagger file
const swaggerSpec = require('../../api/example.oas3.json');

// Parsing incoming requests body and append data to req.body
server.use(express.json());

server.use(express.urlencoded({extended: false})); // Parse URL-encoded bodies

// Enable cors request
server.use(cors(config.cors));

server.set('view engine', 'ejs'); // Set ejs template
server.set("views", path.join(__dirname, "views"));

// Health check route
server.use('/', require('./routes/healthcheck.route'));

// Example Routes
server.use('/', require('./routes/logging.route'));
server.use('/', require('./routes/demoApi.route'));
server.use('/', require('./routes/birthday.route'));

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = server;
