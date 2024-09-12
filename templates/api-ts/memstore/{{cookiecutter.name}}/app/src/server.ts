import express from 'express';
import cors from 'cors';
import config from './config';
import path from "path";
import swaggerUi from 'swagger-ui-express';
import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';
import swaggerSpec from '../../api/example.oas3.json';

import loggingRoute from './routes/logging.route';
import demoApiRoute from './routes/demoApi.route';
import memstoreRoute from './routes/memstore.route';
import healthcheckRoute from './routes/healthcheck.route';

const server = express();

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter: RateLimitRequestHandler = rateLimit({
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
server.set("views", path.join(__dirname, "views"));

// Example Routes
server.use('/', loggingRoute);
server.use('/', demoApiRoute);
server.use('/', memstoreRoute);

// Health check route
server.use('/', healthcheckRoute);

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

export default server;
