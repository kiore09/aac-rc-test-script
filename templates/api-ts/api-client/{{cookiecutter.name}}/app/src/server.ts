import express from 'express';
import cors from 'cors';
import config from './config';
import dotenv from 'dotenv';
import path from "path";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../api/example.oas3.json';

import loggingRoute from './routes/logging.route';
import demoApiRoute from './routes/demoApi.route';
import apiClientRoute from './routes/apiClient.route';
import healthcheckRoute from './routes/healthcheck.route';

dotenv.config();

const server = express();

// Parsing incoming requests body and append data to req.body
server.use(express.json());

// Enable cors request
server.use(cors(config.cors));

server.set('view engine', 'ejs'); // Set ejs template
server.set("views", path.join(__dirname, "views"));

// Example Routes
server.use('/', loggingRoute);
server.use('/', demoApiRoute);
server.use('/', apiClientRoute);

// Health check route
server.use('/', healthcheckRoute);

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

export default server;
