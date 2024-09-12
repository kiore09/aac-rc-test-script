'use strict';
const express = require('express');
const cors = require('cors');
const config = require('../config');
const path = require('path');
const { initializePool } = require('./services/dbQueryService');
const { createHandler } = require('graphql-http/lib/use/express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schemas');
const expressPlayground = require('graphql-playground-middleware-express').default;

const server = express();
const swaggerUi = require('swagger-ui-express');
//Path of Swagger file
const swaggerSpec = require('../../api/example.oas3.json');

// Parsing incoming requests body and append data to req.body
server.use(express.json());
server.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Enable cors request
server.use(cors(config.cors));

server.set('view engine', 'ejs'); // Set ejs template
server.set('views', path.join(__dirname, 'views'));

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
    schema: executableSchema,
    graphiql: true, // Enable graphiql
  })
);

// GraphQL Playground UI
server.get('/playground', expressPlayground({ endpoint: '/graphql' }));

// Health check route
server.use('/', require('./routes/healthcheck.route'));

server.use('/', require('./routes/gqlclient.route'));
server.use('/', require('./routes/demoApi.route'));
server.use('/', require('./routes/logging.route'));

// OpenAPI route
server.use('/api-docs', swaggerUi.serve);
server.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = server;
