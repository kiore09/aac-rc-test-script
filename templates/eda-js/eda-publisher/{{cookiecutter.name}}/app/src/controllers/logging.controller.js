/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 23-12-2022
Description: This sample application demonstrates the use of 'winston' logger 
in a typical NodeJS Express application. 
===========================================================================
*/

const logger = require('../utils/sample.logger');

/*
 Server endpoint that logs a sample info message to the logger whenever a client hits
 GET /infoMsg (e.g. localhost:4005/infoMsg)
*/

const infoMsg = (req, res) => {
  res.send('This is a sample info message');
  logger.info('This is a sample info message from server');
};

/*
 Server endpoint that logs a sample info message to the logger whenever a client hits
 GET /warnMsg (e.g. localhost:4005/warnMsg)
*/

const warnMsg = (req, res) => {
  res.send('This is a sample warn message');
  logger.warn('This is a sample warn message from server');
};

/*
Server endpoint that logs a sample info message to the logger whenever a client hits
GET /errorMsg (e.g. localhost:4005/errorMsg)
*/

const errorMsg = (req, res) => {
  res.send('This is a sample error message');
  logger.error('This is a sample error message from server');
};

module.exports = {infoMsg, warnMsg, errorMsg};
