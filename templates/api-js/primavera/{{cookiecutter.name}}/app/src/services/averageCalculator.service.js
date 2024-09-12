/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 22-04-2022
Description: This function is an example of a simple Jest test.
===========================================================================
*/

let averages = [];
const clearAverages = () => {
  averages = [];
};

const sumOfAverages = () => averages.reduce((prev, curr) => prev + curr, 0);

const computeAverage = (x, y, add2Numbers) => {
  const avg = add2Numbers(x, y) / 2;
  averages.push(avg);
  return avg;
};

module.exports = {sumOfAverages, computeAverage, clearAverages};
