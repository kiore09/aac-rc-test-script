// Imports the Google Cloud client library
const {v1} = require('@google-cloud/pubsub');
const {Firestore} = require('@google-cloud/firestore');
const config = require('../../config');
const logger = require('../utils/sample.logger');

// Creates a client; cache this for further use.
const subscriptionName = config.subscriptionName; // Name for the new subscription to create Ex: projects/<project_id>>/subscriptions/<subscription_name>
const timeout = 20;

// Creates a client; cache this for further use.
const subClient = new v1.SubscriberClient();
// Create a new firestore client
const db = new Firestore({projectId: config.projectId});

async function subscriber() {
  try {
    const numMessages = 10;
    const docPaths = [];

    // The maximum number of messages returned for this request.
    // Pub/Sub may return fewer than the number specified.
    const request = {
      subscription: subscriptionName,
      maxMessages: numMessages,
    };
    // The subscriber pulls a specified number of messages.
    const [response] = await subClient.pull(request);

    // Process the messages.
    const ackIds = [];
    for (const message of response.receivedMessages) {
      logger.info(`Received message ${message.message.data}`);
      docPaths.push(JSON.parse(message.message.data).documentid);
      ackIds.push(message.ackId);
    }

    if (ackIds.length !== 0) {
      // Acknowledge all of the messages.
      const ackRequest = {
        subscription: subscriptionName,
        ackIds: ackIds,
      };
      await subClient.acknowledge(ackRequest);
    }

    // Update firestore document
    // Obtain a document reference.
    if (docPaths.length !== 0) {
      // eslint-disable-next-line guard-for-in
      for (const doc in docPaths) {
        const docName = docPaths[doc];
        logger.info(`Processing Document... ${docName}`);
        const document = db.doc(docName.split('/documents/')[1]);
        // Update an existing document.
        await document.update({
          updated_by: 'demo_consumer',
          updated_time: new Date(),
        });
        logger.info('Document updated successfully!');
      }
    }
  } catch (err) {
    logger.error(`An error occurred while retrieving message: ${err.message}`);
  }
}

const consumer = (req, res) => {
  res.send('Consumer Service');
};

setInterval(() => {
  subscriber();
}, timeout * 1000);

module.exports = {subscriber, consumer};
