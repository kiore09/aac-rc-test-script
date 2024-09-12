/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 09-08-2024
Description: The Swagger specification defines a set of files required to describe such an API.
===========================================================================
*/

import swaggerJsdoc from 'swagger-jsdoc';

// OAS 3.0 file definition
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sample Express API with OpenAPI 3.0',
      version: '0.1.0',
      description: 'This is a simple API application made with Express and documented with OpenAPI',
      contact: {
        name: 'Someone',
        email: 'someone@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080/',
        description: 'Local server',
      },
      {
        url: 'https://localhost:8080/',
        description: 'Local server with SSL',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              format: 'int64',
              description: 'User\'s id',
              example: 1
            },
            firstName: {
              type: 'string',
              description: 'First name of the user',
              example: 'Alice'
            },
            lastName: {
              type: 'string',
              description: 'Last name of the user',
              example: 'Smith'
            },
          },
        },
      },
    },
    "x-api-engagement-num": "910",
    "x-apiname": "demoApiName",
    "x-cmdbid": "21740",
    "x-responsetime": "3000",
    "x-tmfdomain": "common",
    "x-tps": "1000",
  },

  // Search for @swagger or @openapi tags for swagger annotation
  // Relative api paths start from the directory containing node_modules
  apis: ["./src/**/*.ts"],
};

const specs = swaggerJsdoc(options);

const specJson = JSON.stringify(specs, null, 2);

export { specJson };
