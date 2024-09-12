/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 04-05-2024
Description: Example of a logger for browser using pino
===========================================================================
*/

import pino from 'pino';

const pinoConfig = {
  browser: {
    asObject: true,
    write: (logEvent) => {
      console.log(logEvent);
    },
  },
};

const logger = pino(pinoConfig);

export default logger;
