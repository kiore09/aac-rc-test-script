'use strict';
import express from 'express';
import cors from 'cors';
import config from './config';
import dotenv from 'dotenv';
import path from 'path';
import { initializePool } from './services/dbQueryService';
import { createHandler } from 'graphql-http/lib/use/express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schemas';
import expressPlayground from 'graphql-playground-middleware-express';
import swaggerUi from 'swagger-ui-express';
// Path of Swagger file
import swaggerSpec from '../../api/example.oas3.json';

import loggingRoute from './routes/logging.route';
import demoApiRoute from './routes/demoApi.route';
import gqlClientRoute from './routes/gqlclient.route';
import healthcheckRoute from './routes/healthcheck.route';

dotenv.config();

const server = express();

// Enable cors request
server.use(cors(config.cors));
// Parsing incoming requests body and append data to req.body
server.use(express.json());
server.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Graphql endpoint
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Connect to Postgresql
server.use(initializePool);

// GraphQL endpoint using graphql-http
server.use(
  '/graphql',
  createHandler({
    schema: executableSchema
  })
);

server.set('view engine', 'ejs'); // Set ejs template
server.set('views', path.join(__dirname, 'views'));

// GraphQL Playground UI
server.get('/playground', expressPlayground({ endpoint: '/graphql' }));

// Health check route
server.use('/', healthcheckRoute);
server.use('/', gqlClientRoute);
server.use('/', demoApiRoute);
server.use('/', loggingRoute);

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

export default server;
