/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 13-04-2022
Description: This class is an example of a JUnit 5 test class that verifies
the lines of text that is read in by a file parser.
===========================================================================
*/
package com.telus.samples;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;

import com.telus.samples.testing.FileParser;

import org.junit.jupiter.api.Test;

public class FileParserTest {

    private FileParser parser = new FileParser();
    
    /**
     * Test that verifies each line in the resultant list given by the parser
     * matches the actual lines in the input file.
     * 
     * @throws IOException if an I/O error occurs when opening the file
     * @throws URISyntaxException if an error occurs while converting the file
     *      path to a URI
     */
    @Test   // @Test annotation allows JUnit to run this method as a test
    public void testParseFileLines() throws IOException, URISyntaxException {

        // This path resolves to the file src/main/resources/testing/sample.txt
        Path filePath = Paths.get(this.getClass().getClassLoader()
            .getResource("testing/sample.txt").toURI());

        List<String> lineList = parser.parseFileLines(filePath);
        Iterator<String> it = lineList.iterator();

        // Verify the contents of each line that was read in
        assertTrue(it.hasNext());
        assertEquals("This is a sample input file", it.next());
        assertTrue(it.hasNext());
        assertEquals("for the unit testing framework.", it.next());
        assertTrue(it.hasNext());
        assertEquals("", it.next());
        assertTrue(it.hasNext());
        assertEquals("The file parser should read this line by line", it.next());
        assertTrue(it.hasNext());
        assertEquals("and then collect the lines into a list.", it.next());

        assertFalse(it.hasNext());  // Should not have any more lines
    }
}
