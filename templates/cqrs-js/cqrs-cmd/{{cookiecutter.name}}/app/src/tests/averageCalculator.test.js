/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 22-04-2022
Description: This function is an example of a Jest test framework that uses
object mocking to produce predictable outputs from services outside the
class we wish to test.
===========================================================================
*/

const AverageCalculator = require("../services/averageCalculator.service");

describe("Unit test for AverageCalculator class", () => {
  let averageCalculator;

  beforeEach(() => {
    // Whenever averageCalculator calls upon mockService to add 2 numbers,
    // mockDependency will always return the number 10 - regardless of the parameters
    const mockDependency = jest.fn((x, y) => {
      return 10;
    });
    averageCalculator = new AverageCalculator(mockDependency);
  });

  /**
   * Test for computing the average of 2 numbers - note that because we are mocking
   * the underlying service, the expected result '5' is not the real mathematical
   * average.
   *
   * This is done on purpose so that if the underlying service is bugged, the errors
   * will not propogate to this unit test.
   **/

  it("should compute the average of two numbers", () => {
    //Mock dependency function for AverageCalculator class that always returns 10
    expect(averageCalculator.computeAverage(99, 70583)).toBe(5);
  });

  /**
   * Test for getting the sum of all computed averages. Note that the previous test
   * does not contribute to the returned sum in this test, because we reset the test
   * object in the BeforeEach function.
   **/

  it("should compute the average of two numbers", () => {
    averageCalculator.computeAverage(420, 69);
    averageCalculator.computeAverage(1337, 8008);
    averageCalculator.computeAverage(-1, -126);

    // Each call to computeAverage() should add 5 to the sum, therefore the sum is 15
    expect(averageCalculator.sumOfAverages).toBe(15);
  });
});
