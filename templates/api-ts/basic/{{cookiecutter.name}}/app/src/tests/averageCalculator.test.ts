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

import {computeAverage, sumOfAverages, clearAverages} from '../services/averageCalculator.service';

describe('Unit test for AverageCalculator class', () => {
  let mockDependency: jest.Mock;

  beforeEach(() => {
    // Whenever averageCalculator calls upon mockService to add 2 numbers,
    // mockDependency will always return the number 10 - regardless of the parameters
    mockDependency = jest.fn((x, y) => {
      return 10;
    });
  });

  /**
   * Test for computing the average of 2 numbers - note that because we are mocking
   * the underlying service, the expected result '5' is not the real mathematical
   * average.
   *
   * This is done on purpose so that if the underlying service is bugged, the errors
   * will not propagate to this unit test.
   **/

  it('should compute the average of two numbers', () => {
    // Mock dependency function for AverageCalculator class that always returns 10
    expect(computeAverage(99, 70583, mockDependency)).toBe(5);
  });

  /**
   * Test for getting the sum of all computed averages. Note that the previous test
   * does not contribute to the returned sum in this test, because we reset the test
   * object in the BeforeEach function.
   **/

  it('should compute the sum of all computed averages', () => {
    clearAverages();
    computeAverage(420, 669, mockDependency);
    computeAverage(1337, 8008, mockDependency);
    computeAverage(-1, -126, mockDependency);

    // Each call to computeAverage() should add 5 to the sum, therefore the sum is 15
    expect(sumOfAverages()).toBe(15);
  });
});
