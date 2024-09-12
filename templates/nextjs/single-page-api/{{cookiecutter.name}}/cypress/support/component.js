/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-28-2024
Description: Cypress global configuration and support file for component tests
===========================================================================
*/
// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import "@cypress/code-coverage/support";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18'
import { BaseProvider } from '@telus-uds/components-web'
import alliumTheme from '@telus-uds/theme-allium'

Cypress.Commands.add('mount', (component, options) => {
  return mount(<BaseProvider defaultTheme={alliumTheme}>{component}</BaseProvider>, options)
})

// Example use:
// cy.mount(<MyComponent />)
