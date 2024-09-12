/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 20-08-2024
Description: Controller class for the GraphQL client, for displaying the
webpage and submitting user input.
===========================================================================
*/

import { Request, Response } from "express";
import logger from "../utils/sample.logger";
import { testDBConnection } from "../services/dbQueryService";

const _importDynamic = new Function("modulePath", "return import(modulePath)");

export const fetch = async function (...args: any) {
  const { default: fetch } = await _importDynamic("node-fetch");
  return fetch(...args);
};

let error = ""; // Return error message
const url = "http://localhost:8080/graphql"; //const server endpoint for graphql

// Define a custom interface that extends Request
interface CustomRequest extends Request {
  returned_data?: string;
}
/**
 * Server endpoint that fetches the homepage of the graphql postgres template.
 * GET / (e.g. localhost:8080)
 * @param req Express request object
 * @param res Express request object
 */

const gqlHomeView = async (req: Request, res: Response): Promise<void> => {
  await testConnection();
  res.render("index", { error: error });
};

/**
 * Server endpoint that returns the client side web user interface whenever a client hits
 * GET / (e.g. localhost:8080/requestQueryView)
 * @param req Express request object
 * @param res Express request object
 */

const requestQueryView = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  await testConnection();
  const returned_data = req.returned_data || "";
  res.render("graphqlclient", {
    returned_data,
    error: error,
  });
};

/**
 * Server endpoint that sends the query to postgres db, and display the returned data whenever a client hits
 * POST /requestQuery (e.g. localhost:8080/requestQuery)
 * @param req Express request object
 * @param res Express request object
 */

const requestQuery = async (req: Request, res: Response): Promise<void> => {
  //get query from user
  const request_query: string = req.body.request_qry;
  // Sanitize query before logging
  const sanitizedQuery: string = request_query
    .toString()
    .replace(/[\n\r]/g, "");
  console.log(sanitizedQuery);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: request_query }),
    });
    const data = await response.json();
    res.render("graphqlclient", {
      returned_data: JSON.stringify(data),
    });
    console.log("data returned:", data);
  } catch (err) {
    error = err.message;
    res.render("graphqlclient", {
      error: error,
    });
    logger.error(`An Error Occurred: ${error}`);
  }
};

const testConnection = async (): Promise<void> => {
  try {
    await testDBConnection();
  } catch (err) {
    error = err.message;
    logger.error(`An Error Occurred: ${error}`);
  }
};

export { gqlHomeView, requestQueryView, requestQuery };
