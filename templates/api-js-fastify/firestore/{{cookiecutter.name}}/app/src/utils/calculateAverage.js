/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 05-12-2022
Description: This function is an example of a simple test.
===========================================================================
*/

'use-strict'

const sumTwoNumbers = require('./sumTwoNumbers')

const calculateAverage = (x, y) => {
  const sum = sumTwoNumbers(x, y)
  const avg = sum / 2
  return avg
}

module.exports = calculateAverage
