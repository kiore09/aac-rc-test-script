package com.samples.telus;
/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-05-2022
Description: Helper class that converts CSV file contents to JSON format.
===========================================================================
*/
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

public class CsvToJsonConverter {

    /**
     * Reads CSV file data from the given input stream, converts the data to JSON format, then
     * sends the converted data to the given output stream 
     * 
     * @param inStream Source stream of the CSV file
     * @param outStream Destination stream for the converted JSON
     * @throws IOException
     */
    public void convertToJson(InputStream inStream, OutputStream outStream) throws IOException {
        List<Map<?, ?>> data = readObjectsFromCsv(inStream);
        writeAsJson(data, outStream);
    }
    
    /**
     * Reads the contents from the given input stream as a CSV file and outputs a list of maps,
     * where each map represents a row in the CSV file (except the header)
     * 
     * @param inStream Source stream of the CSV file
     * @return List of maps representing the rows in the original CSV
     * @throws IOException
     */
    private List<Map<?, ?>> readObjectsFromCsv(InputStream inStream) throws IOException {
        CsvSchema bootstrap = CsvSchema.emptySchema().withHeader();
        CsvMapper csvMapper = new CsvMapper();
        MappingIterator<Map<?, ?>> mappingIterator = csvMapper.readerFor(Map.class).with(bootstrap).readValues(inStream);

        return mappingIterator.readAll();
    }

    /**
     * Writes the data read from a CSV file into an output stream, in pretty JSON format
     * 
     * @param data List of maps representing the rows in the original CSV
     * @param outStream Destination stream for the converted JSON
     * @throws IOException
     */
    private void writeAsJson(List<Map<?, ?>> data, OutputStream outStream) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.writerWithDefaultPrettyPrinter()
            .writeValue(outStream, data);
    }
}
