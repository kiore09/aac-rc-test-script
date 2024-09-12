/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-12-2024
Description: Cypress configuration file for e2e and component tests
===========================================================================
*/
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}'
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },
  // setting viewport for e2e tests
  viewportWidth: 1280,
  viewportHeight: 720,
});
