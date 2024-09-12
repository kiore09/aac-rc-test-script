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
const {PubSub} = require('@google-cloud/pubsub');
// Creates a client; cache this for further use
const pubSubClient = new PubSub();

/**
 * Background cloud function to be triggered when new document is created in Firestore Collection
 * @param {!Object} event The Cloud Functions event.
 * @param {!Object} context Cloud Functions event metadata.
 */
exports.edaFirestore = (event, context) => {
  try{
    
    // Validate the event type
    if(!context.eventType.equalIgnoreCase("providers/cloud.firestore/eventTypes/document.create")){
      logger.error(`Invalid Event type: ${context.eventType}`);
      return;
    }
    
    const edaTopic = process.env.EDA_TOPIC;
    // validate the topic variable
    if(!edaTopic){
      logger.error(`Pubsub Topic not configured!`);
      return;
    }

    const triggerResource = context.resource;
    const edaFirestoreCollection = process.env.FIRESTORE_COLLECTION;

    logger.info(`Function started, edaTopic: ${edaTopic}, edaFirestoreCollection: ${edaFirestoreCollection}`);
    logger.info(`Function triggered by event on: ${triggerResource}`);
    logger.info(`Event type: ${context.eventType}`);
        
    // publish the message to PubSub Topic
    const dataBuffer = Buffer.from(JSON.stringify({documentid: triggerResource}));
    const message = {
      data: dataBuffer      
    };
    
    pubSubClient
        .topic(edaTopic)
        .publishMessage(message).then(messageId =>{
          logger.info(`Message ${messageId} published.`);
    });        

  }catch (error) {
    logger.error(`An error occurred: ${error.message}`);
  }
};

String.prototype.equalIgnoreCase = function(str)
{
    return (str != null 
            && typeof str === 'string'
            && this.toUpperCase() === str.toUpperCase());
}