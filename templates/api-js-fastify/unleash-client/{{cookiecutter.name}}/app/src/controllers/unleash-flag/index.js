'use strict'
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 22-08-2023
Description: This module demonstrates the status retrieval of an Unleash feature toggle.
===========================================================================
*/
const config = require('../../../config');

const unleashFlags = async (request, reply) => {
  try {
    const toggleName = config.unleash_flag_name;
    // Getting current timestamp to display alongside toggle status
    let now = new Date(Date.now()).toISOString();
    const isEnabled = await request.server.featureFlags.isEnabled(toggleName);
    reply.view('unleash.ejs', { toggleName: toggleName, isEnabled: isEnabled, time: now });
  } catch (err) {
    reply.view('unleash.ejs', { error: err })
    request.server.error(`An error occurred: ${err.message}`)
  }
  return reply;
};

module.exports = { unleashFlags };
