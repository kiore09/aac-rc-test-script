/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 31-05-2024
Description: This sample application demonstrates access to a firestore
collection on GCP.
===========================================================================
*/

import FirestoreClient from '../services/FirestoreClient.service';
import logger from '../utils/sample.logger';
import config from '../config';
import { Request, Response } from 'express';

const firestoreCollection = config.firestoreCollection;

const getDocuments = async (req: Request, res: Response): Promise<void> => {
  const collectionDocuments = await FirestoreClient.getDocuments();

  const docs = collectionDocuments.map((docObj: any) => ({
    id: docObj.id,
    data: typeof docObj.data === 'function' ? JSON.stringify(docObj.data()) : JSON.stringify(docObj)
  }));

  try {
    res.render('getDocuments', {
      firestoreCollection: firestoreCollection,
      collectionDocuments: docs,
    });
  } catch (err) {
    res.render('getDocuments', {
      error: 'An error occurred while processing your request.',
    });
    logger.error(`An error occured: ${err.message}\nStack trace: ${err.stack}`);
  }
};

export default { getDocuments };
