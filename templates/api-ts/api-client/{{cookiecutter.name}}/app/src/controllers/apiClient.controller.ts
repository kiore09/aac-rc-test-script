/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-07-2024
Description: Description: This controller demonstrates how to generate an OAuth2 token,
create a multipart/form-data request body, and send a request to an API
endpoint with the token and body. In particular, this implementation is
calling an email proxy endpoint.
===========================================================================
*/
import { Request, Response } from 'express';
import { getSecret } from '../utils/secret-manager';
import config from '../config';
import { axiosReqConfig } from '../config/axiosConfig';
import logger from '../utils/sample.logger';
import axios, { AxiosBasicCredentials, AxiosRequestConfig, AxiosResponse } from 'axios';
import FormData from 'form-data';

/**
 * Server endpoint that shows the home page of smtp email service
 * GET / (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express response object
 */

const homeView = async (req: Request, res: Response): Promise<void> => {
  res.render('index');
};
/**
 * Server endpoint that shows the email body form whenever a client hits
 * GET /secret (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express response object
 */

const emailView = (req: Request, res: Response): void => {
  const statusCode = req.statusCode || '';
  res.render('send', {statuscode: statusCode, response_msg: '', fromDomain: config.fromDomain});
};

/**
 * Server endpoint that send the email to smtp relay whenever a client hit
 * POST / (e.g. localhost:4005)
 * @param req Express request object
 * @param res Express response object
 */

const sendEmails = async (req: Request, res: Response) => {
  // Ex:clientID = projects/123456789/secrets/sample-secret-id/versions/version-number
  const clientID: string = `projects/${config.projectId}/secrets/${config.clientID}/versions/latest`;
  const clientSECRET: string = `projects/${config.projectId}/secrets/${config.clientSECRET}/versions/latest`;
  const accessTokenURL: string = config.apigwTokenURL;
  const apiEndpointURL: string = config.apiEndpointURL;
  const apiScope: string = config.apigwTokenScope;

  try {
    const versionid = await getSecret(clientID);
    const versionsecret = await getSecret(clientSECRET);
    logger.info('Retrieving secrets...');
    // Decode client credentials
    const clientIDValue: string = new TextDecoder('utf-8').decode(versionid.payload.data);
    const clientSECRETValue: string = new TextDecoder('utf-8').decode(versionsecret.payload.data);

    // Make request to get access token
    logger.info('Retrieving token...');
    const auth: AxiosBasicCredentials = {
      username: clientIDValue,
      password: clientSECRETValue
    };
    const params: any = {
      scope: apiScope,
      grant_type: 'client_credentials'
    };
    const tokenOptions = { ...axios.defaults, auth, params };
  
    const tokenResponse: AxiosResponse = await axios.post(accessTokenURL, null, tokenOptions as AxiosRequestConfig<any>);
    const token: string = tokenResponse.data.access_token;  // Extract token from response

    // Send email data to proxy
    logger.info('Sending email...');
    const form: FormData = new FormData();
    form.append('from', req.body.from);
    form.append('to', req.body.to);
    form.append('subject', req.body.subject);
    form.append('bodyText', req.body.bodyText);

    if (req.body.cc) {
      form.append('cc', req.body.cc);
    }

    if (req.body.bcc) {
      form.append('bcc', req.body.bcc);
    }
    
    if (req.body.ishtmlbody) {
      form.append('isHtmlBody', "true");
    }
    
    if (Array.isArray(req.files)) {
      for(let i = 0; i < req.files.length; i++){
        form.append('attachment', req.files[i].buffer, req.files[i].originalname);
      }
    }

    const headers = {
      ...form.getHeaders(),
      'Authorization': 'Bearer ' + token
    }
    const emailOptions: AxiosRequestConfig = { ...axiosReqConfig, headers };
    const emailResponse: AxiosResponse = await axios.post(apiEndpointURL, form, emailOptions);
    logger.info(emailResponse.status);
    logger.info(emailResponse.data);
    
    // Render view
    res.render('send', {
      response_msg: JSON.stringify(emailResponse.data),
      statuscode: emailResponse.status,
      fromDomain: config.fromDomain
    });

  } catch (err) {
    // Check if the error has a response object (i.e. an error occurred during the Axios request)
    if (err.response) {
      const responseData: string = JSON.stringify(err.response.data);
      const responseStatus: string = err.response.status;
      res.render('send', {
        error: responseData,
        response_msg: responseStatus,
        fromDomain: config.fromDomain
      });
      logger.error(`An Error Occurred: ${responseData}`);
      // If the error does not have a response object, check if it has a message property (i.e. a general error occurred)
    } else if (err.message) {
      res.render('send', {
        error: err.message,
        response_msg: '',
        fromDomain: config.fromDomain
      });
      logger.error(`An Error Occurred: ${err.message}`);
    }
  };
};

export { homeView, emailView, sendEmails };

