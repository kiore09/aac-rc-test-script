/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 23-12-2022
Description: This middleware is part of the birthday controller to validate 
fields required and payload.
* This middleware ensures that the body parameters of incoming requests are required (not empty) before allowing further processing.
* Additionally, it's crucial to validate and sanitize user inputs to prevent security vulnerabilities such as cross-site scripting (XSS).
* Refer to this helpful guide for more information on how to prevent XSS in Node.js applications:
* Link: https://www.section.io/engineering-education/how-to-prevent-cross-site-scripting-in-node-js/
===========================================================================
*/

const escape = require ('escape-html');

//This middleware ensure the body parameters are required (not empty) before continuing
const fieldsRequired = (req, res, next) => {
    if( req.body.name == '' || req.body.birthDay == '' || req.body.birthMonth == '') {
        res.status(400).send('{"statusCode":400,"error":"Bad Request","message":"fields must NOT have fewer than 1 characters"}');
    } else {
        next();
    }
}

 //This middleware ensure the body parameters are valid before continuing
const isNumberValidation = (req, res, next) => { 
    if ( isNaN(req.body.birthDay) || isNaN(req.body.birthMonth) ) {
        res.status(400).send('{"statusCode":400,"error":"Bad Request","message":"NaN in request"}');
    } else {
        next();
    }
}

const payload = (req, res, next, payload) => {
    console.log(payload)
    if (res.statusCode == 200)
    {
      // Please validate and sanitize user inputs before using as parameters in other functions
      const newPayload = {message: `Hello ${payload.name}, ${payload.days} more days before your birthday!`};
      const escapedPayload = escape(JSON.stringify(newPayload));
      res.send(escapedPayload)
    } else {
        next();
    }
}

module.exports = { fieldsRequired, isNumberValidation, payload };