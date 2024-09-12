'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const config = require('../config');

const server = express();
const swaggerUi = require('swagger-ui-express');
//Path of Swagger file
const swaggerSpec = require('../../api/example.oas3.json');

const RateLimit = require('express-rate-limit');

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
  });
  

// Apply rate limiter to all routes
server.use(limiter);

// Enable 'trust proxy' to trust the 'X-Forwarded-For' header set by proxies
server.set('trust proxy', 1);

server.use(express.json()); // Parse incoming requests body and append data to req.body
server.use(express.urlencoded({extended: false})); // Parse URL-encoded bodies

server.use(cors(config.cors));

// Health check route
server.use('/', require('./routes/healthcheck.route'));

server.set('view engine', 'ejs'); // Set ejs template
server.set("views", path.join(__dirname, "views"));

server.use('/', require('./routes/gcstorage.route'));
server.use('/', require('./routes/demoApi.route'));
server.use('/', require('./routes/logging.route'));

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = server;
