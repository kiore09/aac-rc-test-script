'use strict';
const express = require('express');
const cors = require('cors');
const config = require('../config');
const path = require('path');
const server = express();
const { rateLimit } = require('express-rate-limit')
const swaggerUi = require('swagger-ui-express');
// Path of Swagger file
const swaggerSpec = require('../../api/example.oas3.json');

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// Apply rate limiter to all routes
server.use(limiter);

// Enable 'trust proxy' to trust the 'X-Forwarded-For' header set by proxies
server.set('trust proxy', 1);

// Parsing incoming requests body and append data to req.body
server.use(express.json());
server.use(express.urlencoded({extended: false})); // Parse URL-encoded bodies

// Enable cors request
server.use(cors(config.cors));

server.set('view engine', 'ejs'); // Set ejs template
server.set('views', path.join(__dirname, 'views'));

// Health check
server.use('/', require('./routes/healthcheck.route'));

// Example Routes
server.use('/', require('./routes/logging.route'));
server.use('/', require('./routes/demoApi.route'));
server.use('/', require('./routes/memstore.route'));

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = server;
