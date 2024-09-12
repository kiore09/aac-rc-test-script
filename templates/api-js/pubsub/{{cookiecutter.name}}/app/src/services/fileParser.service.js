/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 22-04-2022
Description: This function is part of the unit testing framework
demonstration. It reads a file line by line then returns all read lines as
a list.
===========================================================================
*/

const fs = require('fs').promises;

/**
    Reads the file with the input file path line by line, returns the edited
    lines as a list.
**/

async function parseReader(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString().split(/\r\n|\n|\r/);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {parseReader};
