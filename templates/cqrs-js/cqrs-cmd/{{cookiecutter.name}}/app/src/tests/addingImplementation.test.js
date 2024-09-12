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

const addingImplementation = require("../utils/addingImplementation");

/**
 * Test for adding 2 numbers and ensuring their sum is correct
 **/
describe("Unit test for AddingImplementation function", () => {
  it("should compute the sum of two numbers", () => {
    //Mock dependency function for AverageCalculator class that always returns 20
    expect(addingImplementation.add2Numbers(2, 3)).toBe(5);
  });
});
