/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 12-04-2022
Description: This class is an example of a simple JUnit 5 test class.
===========================================================================
*/
package com.telus.samples;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.telus.samples.testing.AddingServiceImpl;


public class AddingServiceImplTest {

    // Create an instance of the class to test
    private AddingServiceImpl someServiceImpl = new AddingServiceImpl();

    /**
     * Test for adding 2 numbers and ensuring their sum is correct
     */
    @Test   // @Test annotation allows JUnit to run this method as a test
    public void testAdd2Numbers() {
        int result = someServiceImpl.add2Numbers(2, 3);
        assertEquals(5, result);

        result = someServiceImpl.add2Numbers(100, 200);
        assertEquals(300, result);
    }
}