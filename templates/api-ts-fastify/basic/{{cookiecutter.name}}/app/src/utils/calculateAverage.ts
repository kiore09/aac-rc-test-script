'use-strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 04-23-2024
Description: This function computes the average of 2 numbers, used by the
calculate-average plugin.
===========================================================================
*/

import sumTwoNumbers from './sumTwoNumbers';

const calculateAverage = (x: number, y: number): number => {
  const sum = sumTwoNumbers(x, y);
  const avg = sum / 2;
  return avg;
};

export default calculateAverage;
