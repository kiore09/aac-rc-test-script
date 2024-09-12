/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 13-04-2022
Description: This class is part of the unit testing framework
demonstration. It reads a file line by line then returns all read lines as
a list.
===========================================================================
*/
package com.telus.samples.testing;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class FileParser {
    
    /**
     * Reads the file with the input file path line by line, returns the edited
     * lines as a list.
     * 
     * @param filePath Path to file to be read
     * @return List of each line read
     * @throws IOException if an I/O error occurs when opening a file
     */
    public List<String> parseFileLines(Path filePath) throws IOException {
        List<String> lineList = new ArrayList<>();

        // Read file line by line, then add to returned list
        try (Stream<String> lineStream = Files.lines(filePath)) {
            lineStream.forEach(line -> lineList.add(line));
        }

        return lineList;
    }
}
