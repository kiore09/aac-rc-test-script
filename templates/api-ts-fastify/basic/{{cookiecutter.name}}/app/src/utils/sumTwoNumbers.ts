'use-strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 04-23-2024
Description: This function computes the sum of 2 numbers.
===========================================================================
*/

const sumTwoNumbers = (x: number, y: number): number => {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }
  return x + y;
};

export default sumTwoNumbers;
