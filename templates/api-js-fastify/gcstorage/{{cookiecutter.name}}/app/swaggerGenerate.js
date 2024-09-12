/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 26-04-2024
Description: Entry point to generate a OpenAPI 3.0 file. Run in npm with:
    npm run docs
    
This script is only used to write the OpenAPI documentation to a file.
The resultant file path can be changed here.
===========================================================================
*/
const fs = require('fs')
const { specJson } = require('./swaggerSpec')

try {
  fs.writeFileSync('../api/example.oas3.json', specJson)
} catch (err) {
  console.error(err)
}
