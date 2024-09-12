/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-07-2024
Description: Utility class to mask string characters
===========================================================================
*/

const stringMask = (inputString: string): string => {
    // Completely mask short strings
    if (inputString.length <= 10) {
        return "x".repeat(inputString.length);
    }

    // Otherwise, reveal the first 2 and last 2 characters
    let masked = inputString.slice(0, 2);
    masked += "x".repeat(inputString.length - 4);
    masked += inputString.slice(inputString.length - 2, inputString.length);
    return masked;
}

export default stringMask;
