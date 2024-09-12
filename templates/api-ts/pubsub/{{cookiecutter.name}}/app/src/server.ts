'use strict';

import express from 'express';
import cors from 'cors';
import config from './config';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../api/example.oas3.json';

import loggingRoute from './routes/logging.route';
import demoApiRoute from './routes/demoApi.route';
import pubsubRoute from './routes/pubsub.route';
import healthcheckRoute from './routes/healthcheck.route';

const server = express();

// Parsing incoming requests body and append data to req.body
server.use(express.json());

// Parse URL-encoded bodies
server.use(express.urlencoded({extended: false}));

// Enable cors request
server.use(cors(config.cors));

server.set('view engine', 'ejs'); // Set ejs template
server.set('views', path.join(__dirname, 'views'));

server.use('/', pubsubRoute);
server.use('/', loggingRoute);
server.use('/', demoApiRoute);

// Health check route
server.use('/', healthcheckRoute);

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

export default server;
