import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import config from './config';
import axiosConfig from './config/axiosConfig';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../api/example.oas3.json';

// Initialize environment variables
dotenv.config();

// Initialize Axios configuration
axiosConfig();

// Create an Express application
const server: Application = express();

// Middleware to parse incoming JSON requests and URL-encoded bodies
server.use(express.json()); // Parse incoming requests body and append data to req.body
server.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Use CORS with specific configuration
server.use(cors(config.cors));

// Set up the view engine to use EJS templates
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

// Importing routes
import tokenParsingRoute from './routes/tokenParsing.route';
import demoApiRoute from './routes/demoApi.route';
import loggingRoute from './routes/logging.route';
import healthcheckRoute from './routes/healthcheck.route';

// Register routes
server.use('/', tokenParsingRoute);
server.use('/', demoApiRoute);
server.use('/', loggingRoute);
server.use('/', healthcheckRoute);

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

// Export the configured server
export default server;

