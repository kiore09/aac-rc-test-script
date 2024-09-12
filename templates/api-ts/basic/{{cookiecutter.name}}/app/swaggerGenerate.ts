/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 24-05-2024
Description: Entry point to generate a Swagger 2.0 file. Run in npm with:
    npm run docs

This script is only used to write the swagger documentation to a file.
The resultant file path can be changed here.
===========================================================================
*/

import fs from 'fs';
import { specJson } from './swaggerSpec';

import path from 'path';

const filePath = path.resolve(__dirname, '../api/example.oas3.json');
const dirPath = path.dirname(filePath);

try {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(filePath, specJson);
    console.log('File written successfully');
} catch (err) {
    console.error(err);
}
