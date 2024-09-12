/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 12-04-2022
Description: This class is an example of a JUnit 5 test class that uses
object mocking to produce predictable outputs from services outside the
class we wish to test.
===========================================================================
*/
package com.telus.samples;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyInt;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.telus.samples.testing.AddingService;
import com.telus.samples.testing.AverageCalculator;


@ExtendWith(MockitoExtension.class) // Extend JUnit 5 with Mockito functionality
public class AverageCalculatorTest {

    @Mock   // Mockito will mock references with @Mock, equivalent to calling Mockito.mock()
    private AddingService mockedService;

    private AverageCalculator testableClass;

    /**
     * Before each test method executes, run this method
     */
    @BeforeEach
    public void resetBeforeEach() {
        Mockito.reset(mockedService);   // Reset the underlying mocked service
        testableClass = new AverageCalculator(mockedService);   // Set/reset the object we are testing against
    }

    /**
     * Test for computing the average of 2 numbers - note that because we are mocking
     * the underlying service, the expected result '5' is not the real mathematical
     * average.
     * 
     * This is done on purpose so that if the underlying service is bugged, the errors
     * will not propogate to this unit test.
     */
    @Test   // @Test annotation allows JUnit to run this method as a test
    public void testComputeAverage() {

        // Whenever testableClass calls upon mockService to add 2 numbers,
        // mockedService will always return the number 10 - regardless of the parameters
        Mockito.when(mockedService.add2Numbers(anyInt(), anyInt())).thenReturn(10);

        double result = testableClass.computeAverage(99, 70583);
        assertEquals(5, result);    // Hence the result should just be 5
    }
    
    /**
     * Test for getting the sum of all computed averages. Note that the previous test
     * does not contribute to the returned sum in this test, because we reset the test
     * object in the @BeforeEach method.
     */
    @Test   // @Test annotation allows JUnit to run this method as a test
    public void testGetSumOfAveragesTest() {

        // Whenever testableClass calls upon mockService to add 2 numbers,
        // mockedService will always return the number 10 - regardless of the parameters
        Mockito.when(mockedService.add2Numbers(anyInt(), anyInt())).thenReturn(10);

        testableClass.computeAverage(420, 69);
        testableClass.computeAverage(1337, 8008);
        testableClass.computeAverage(-1, -126);

        // Each call to computeAverage() should add 5 to the sum, therefore the sum is 15
        assertEquals(15, testableClass.getSumOfAverages());
    }
}
