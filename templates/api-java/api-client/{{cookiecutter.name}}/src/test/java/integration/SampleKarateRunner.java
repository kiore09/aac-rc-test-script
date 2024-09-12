/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 08-09-2022
Description: Test class to be triggered by maven during integration tests.
This class will then use Karate to run .feature files
===========================================================================
*/
package integration;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;

public class SampleKarateRunner {
    
    /**
     * Runs every .feature test in the "src/test/java/integration" folder.
     * Assert that there will not be any failures.
     */
    @Test
    public void sampleTest() {
        Results results = Runner.path("classpath:integration").parallel(1);
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}
