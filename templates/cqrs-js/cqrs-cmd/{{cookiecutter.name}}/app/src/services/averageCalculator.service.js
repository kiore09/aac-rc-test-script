/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 12-04-2022
Description: This function is an example of a simple Jest test.
===========================================================================
*/

class AverageCalculator {
    
  sumOfAverages;
  add2Numbers;

  constructor(add2Numbers) {
    this.add2Numbers = add2Numbers;
    this.sumOfAverages = 0;
  }

  /**
   * Computes the average of two integers, adds the result to the running sum
   *
   * @param x An input integer
   * @param y An input integer
   * @return The average of the inputs
   */
  
  computeAverage(x, y) {
    let avg = this.add2Numbers(x, y) / 2;
    this.sumOfAverages += avg;
    return avg;
  }
}

module.exports = AverageCalculator;
