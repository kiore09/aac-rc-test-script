/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 09-08-2024
Description: This middleware is part of the birthday controller to validate 
fields required and payload.
* This middleware ensures that the body parameters of incoming requests are required (not empty) before allowing further processing.
* Additionally, it's crucial to validate and sanitize user inputs to prevent security vulnerabilities such as cross-site scripting (XSS).
* Refer to this helpful guide for more information on how to prevent XSS in Node.js applications:
* Link: https://www.section.io/engineering-education/how-to-prevent-cross-site-scripting-in-node-js/
===========================================================================
*/
import type { Request, Response, NextFunction } from 'express';
import escape from 'escape-html'; 

// This middleware ensures the body parameters are required (not empty) before continuing
const fieldsRequired = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body.name === '' || req.body.birthDay === '' || req.body.birthMonth === '') {
        res.status(400).send('{"statusCode":400,"error":"Bad Request","message":"fields must NOT have fewer than 1 characters"}');
    } else {
        next();
    }
};

// This middleware ensures the body parameters are valid before continuing
const isNumberValidation = (req: Request, res: Response, next: NextFunction): void => {
    if (isNaN(Number(req.body.birthDay)) || isNaN(Number(req.body.birthMonth))) {
        res.status(400).send('{"statusCode":400,"error":"Bad Request","message":"NaN in request"}');
    } else {
        next();
    }
};

interface Payload {
    name: string;
    days: number;
}

const payloadHandler = (req: Request, res: Response, next: NextFunction, payload: Payload): void => {
    console.log(payload);
    if (res.statusCode === 200) {
        // Please validate and sanitize user inputs before using as parameters in other functions
        const newPayload = { message: `Hello ${payload.name}, ${payload.days} more days before your birthday!` };
        const escapedPayload = escape(JSON.stringify(newPayload));
        console.log(escapedPayload)
        res.send(JSON.stringify(escapedPayload));
    } else {
        next();
    }
};

export { fieldsRequired, isNumberValidation, payloadHandler, Payload };
