/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 13-03-2023
Description: Utility class to mask string characters
===========================================================================
*/
package com.telus.samples.utils;

import java.util.Arrays;

public class StringMask {
    
    public static String mask(String input) {

        char[] buffer = input.toCharArray();

        // Completely mask short strings
        if (input.length() <= 10) {
            Arrays.fill(buffer, 'x');
            return new String(buffer);
        }

        // Otherwise, reveal the first 2 and last 2 characters
        Arrays.fill(buffer, 2, input.length() - 2, 'x');
        return new String(buffer);
    }
}
