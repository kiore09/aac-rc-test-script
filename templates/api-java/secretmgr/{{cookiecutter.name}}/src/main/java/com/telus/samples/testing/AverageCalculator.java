/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 12-04-2022
Description: This class is part of the unit testing framework
demonstration. It computes the average of two integers, relying on
some external dependency. It also accumulates a running sum of all
results it has computed.
===========================================================================
*/
package com.telus.samples.testing;

import org.springframework.beans.factory.annotation.Autowired;

public class AverageCalculator {
    
    private AddingService service;    // Dependency to be mocked in unit tests

    private double sumOfAverages;

    @Autowired
    public AverageCalculator(AddingService service) {
        this.service = service;
        this.sumOfAverages = 0;
    }

    /**
     * Computes the average of two integers, adds the result to the running sum
     * 
     * @param x An input integer
     * @param y An input integer
     * @return The average of the inputs
     */
    public double computeAverage(int x, int y) {
        double avg = service.add2Numbers(x, y) / 2.0;
        sumOfAverages += avg;
        return avg;
    }

    /**
     * Get the sum of all computed averages
     * 
     * @return The sum of all compute averages
     */
    public double getSumOfAverages() {
        return sumOfAverages;
    }
}
