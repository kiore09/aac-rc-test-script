'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const config = require('../config');
const axiosConfig = require('../config/axiosConfig');

axiosConfig();
const server = express();
const swaggerUi = require('swagger-ui-express');
//Path of Swagger file
const swaggerSpec = require('../../api/example.oas3.json');

server.use(express.json()); // Parse incoming requests body and append data to req.body
server.use(express.urlencoded({extended: false})); // Parse URL-encoded bodies

server.use(cors(config.cors));

server.set('view engine', 'ejs'); // Set ejs template
server.set("views", path.join(__dirname, "views"));
server.use('/', require('./routes/apiClient.route'));
server.use('/', require('./routes/demoApi.route'));
server.use('/', require('./routes/logging.route'));

// Health check route
server.use('/', require('./routes/healthcheck.route'));

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = server;
