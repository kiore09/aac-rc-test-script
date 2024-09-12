/**
 ===========================================================================
 This sample code is created by the Architecture as Code team at TELUS.
 The main purpose of this code is to give developers at TELUS a reference
 and starting point for their projects.
 As a TELUS Developer, you may update your copy of this code per your needs.
 ===========================================================================
 Last updated: 27-04-2022
 Description: This function:
 - Is triggered when a new document is added to the monitored Firetsore Collection.
 - Once triggered, this function will extract the document path and publish it as a message to the given PubSub Toipc.
 ===========================================================================
 */
 const logger = require('./utils/sample.logger');
 require('dotenv').config()
 const { PubSub} = require('@google-cloud/pubsub');
 const {Firestore} = require('@google-cloud/firestore');
  
 // Create a new firestore client
 const firestore = new Firestore();

// Set collection
firestoreCol = firestore.collection(process.env.FIRESTORE_COLLECTION);

exports.cqrsPubSub = (eventData, context) => {
  try {
    const data = eventData.data;
    const message =  Buffer.from(data, 'base64').toString();
   
    let temp = JSON.parse(message);
    let age = (new Date(Date.now()).getFullYear() - new Date(temp.dateOfBirth).getFullYear());
    temp = {
      ...temp,
      age,
      }; 
    const docName = `doc-${temp.id}`;
    const docRef = firestoreCol.doc(docName);
    
    logger.info(temp);
    docRef.set(temp);
  } catch (error) {
      logger.error(`An error occurred: ${error.message}`);
    }
}