/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 20-08-2024
Description: This function is an example of a simple Jest test.
===========================================================================
*/

let averages: number[] = [];

const clearAverages = (): void => {
  averages = [];
};

const sumOfAverages = (): number => {
  return averages.reduce((prev, curr) => prev + curr, 0);
};

const computeAverage = (x: number, y: number, add2Numbers: (a: number, b: number) => number): number => {
  const avg: number = add2Numbers(x, y) / 2;
  averages.push(avg);
  return avg;
};

export { sumOfAverages, computeAverage, clearAverages };
