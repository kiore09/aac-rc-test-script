/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-07-2024
Description: This is an example of a Jest test that verifies
the lines of text that is read in by a file parser.
===========================================================================
*/

import { parseReader } from '../services/fileParser.service';

/**
 * Test that verifies each line in the resultant list given by the parser
 * matches the actual lines in the input file.
 **/
describe('this is a read file test', () => {
  it('should read the file', async () => {
    // Get text lines as an array
    const lines = await parseReader('./src/resources/testing/sample.txt');

    // Verify the contents of each line that was read in
    expect(lines[0]).toEqual('This is a sample input file');
    expect(lines[1]).toEqual('for the unit testing framework.');
    expect(lines[2]).toBe('');
    expect(lines[3]).toBe('The file parser should read this line by line');
    expect(lines[4]).toBe('and then collect the lines into a list.');
  });
});
