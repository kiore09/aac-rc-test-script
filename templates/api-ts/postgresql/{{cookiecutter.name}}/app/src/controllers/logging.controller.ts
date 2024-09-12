/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 31-05-2024
Description: This sample application demonstrates the use of 'winston' logger 
in a typical NodeJS Express application. 
===========================================================================
*/

import logger from '../utils/sample.logger';
import type { Request, Response } from 'express';

/*
 Server endpoint that logs a sample info message to the logger whenever a client hits
 GET /infoMsg (e.g. localhost:4005/infoMsg)
*/

const infoMsg = (req: Request, res: Response): void => {
  res.send('This is a sample info message');
  logger.info('This is a sample info message from server');
};

/*
 Server endpoint that logs a sample info message to the logger whenever a client hits
 GET /warnMsg (e.g. localhost:4005/warnMsg)
*/

const warnMsg = (req: Request, res: Response): void => {
  res.send('This is a sample warn message');
  logger.warn('This is a sample warn message from server');
};

/*
Server endpoint that logs a sample info message to the logger whenever a client hits
GET /errorMsg (e.g. localhost:4005/errorMsg)
*/

const errorMsg = (req: Request, res: Response): void => {
  res.send('This is a sample error message');
  logger.error('This is a sample error message from server');
};

export { infoMsg, warnMsg, errorMsg };
