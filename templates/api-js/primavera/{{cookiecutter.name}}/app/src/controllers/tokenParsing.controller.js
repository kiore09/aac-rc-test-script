/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-02-2023
Description: Description: This controller demonstrates how to generate an OAuth2 token,
create a multipart/form-data request body, and send a request to an API
endpoint with the token and body. In particular, this implementation is
calling an email proxy endpoint.
===========================================================================
*/

const logger = require('../utils/sample.logger');
const { jwtDecode } = require('jwt-decode');
let error = ''; // Return error message

/**
 * Server endpoint that shows the home page of primavera sample
 * GET / (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express request object
 */

const homeView = async (req, res) => {
  res.render('index');
};
/**
 * Server endpoint that shows the user information of a client whenever a client hits
 * GET /secret (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express request object
 */

const namesView = (req, res) => {
  try{
    var header = JSON.parse(JSON.stringify(req.headers));
    var decoded = jwtDecode(header["x-id-token"]);
    var token = JSON.parse(JSON.stringify(decoded));
    var given_name = token.given_name;
    var family_name = token.family_name;
    logger.info(token);
    res.render('names', {givenName: given_name, familyName: family_name});

  } catch (err){
    error = err;
    logger.info(error);
    res.render('names', {givenName: 'null', familyName: 'null', error: error.message});
  }
};


module.exports = {homeView, namesView};

