/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 24-08-2024
Description: Description: This controller demonstrates how to generate an OAuth2 token,
create a multipart/form-data request body, and send a request to an API
endpoint with the token and body. In particular, this implementation is
calling an email proxy endpoint.
===========================================================================
*/

import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Request, Response } from 'express';
import logger from '../utils/sample.logger';

// Define your custom JwtPayload interface
interface CustomJwtPayload extends JwtPayload {
  given_name?: string;
  family_name?: string;
}

let error = ''; // Return error message

/**
 * Server endpoint that shows the home page of primavera sample
 * GET / (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express response object
 */
const homeView = async (req: Request, res: Response): Promise<void> => {
  res.render('index');
};

/**
 * Server endpoint that shows the user information of a client whenever a client hits
 * GET /names (e.g. localhost:4005/names)
 * @param req Express request object
 * @param res Express response object
 */
const namesView = (req: Request, res: Response): void => {
  try {
    const header = req.headers as Record<string, string>;
    const token = header['x-id-token'];

    // Use your custom JwtPayload interface
    const decoded = jwtDecode<CustomJwtPayload>(token as string); // Decode the JWT

    const givenName = decoded.given_name || 'null';
    const familyName = decoded.family_name || 'null';

    logger.info(decoded);
    res.render('names', { givenName, familyName });
  } catch (err) {
    error = (err as Error).message;
    logger.error(error);
    res.render('names', { givenName: 'null', familyName: 'null', error });
  }
};

export { homeView, namesView };
