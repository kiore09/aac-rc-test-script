'use strict';

import express from 'express';
import cors from 'cors';
import config from './config';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../api/example.oas3.json';

import healthcheckRoute from './routes/healthcheck.route';
import loggingRoute from './routes/logging.route';
import demoApiRoute from './routes/demoApi.route';
import birthdayRoute from './routes/birthday.route';

const server = express();

// Parsing incoming requests body and append data to req.body
server.use(express.json());

server.use(express.urlencoded({extended: false})); // Parse URL-encoded bodies

// Enable cors request
server.use(cors(config.cors));

server.set('view engine', 'ejs'); // Set ejs template
server.set("views", path.join(__dirname, "views"));

// Health check route
server.use('/', healthcheckRoute);

// Example Routes
server.use('/', loggingRoute);
server.use('/', demoApiRoute);
server.use('/', birthdayRoute);

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

export default server;
