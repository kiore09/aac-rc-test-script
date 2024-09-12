/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 03-01-2023
Description: This sample controller demonstrates the use of the Google
Cloud Pub/Sub client library to publish messages to a Pub/Sub topic and consume messages from a subscription.
The application uses Thymeleaf as an HTML templating engine. The templates
can be found under the src/views directory.
===========================================================================
*/

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');
const {v1} = require('@google-cloud/pubsub');
const logger = require('../utils/sample.logger');
const config = require('../../config');

const projectId = config.projectId; // Your Google Cloud Platform project ID
const topicName = config.topicName; // Name for the new topic to create Ex: projects/<project_id>>/topics/<topic_name>
const subscriptionName = config.subscriptionName; // Name for the new subscription to create Ex: projects/<project_id>>/subscriptions/<subscription_name>

// Creates a client; cache this for further use.
const subClient = new v1.SubscriberClient();

// Instantiates a client
const pubSubClient = new PubSub({projectId});

let error = ''; // Return error message

/**
 * Server endpoint that opens the test log page whenever a client hits
 * GET / (e.g. localhost:8080)
 * @param req Express request object
 * @param res Express request object
 */

const pubSub = (req, res) => {
  res.render('index');
};

/**
 * Server endpoint that returns view to test pubsub whenever a client hits
 * GET /pubsub (e.g. localhost:8080/pubsub)
 * @param req Express request object
 * @param res Express request object
 */
const tryPubSub = async (req, res) => {
  try {
    // Creates message on a topic
    await publishMessage();

    // Retrieve subscriptions
    const message = await listenForMessages();

    res.render('pubsub', {
      topic: topicName,
      subscription: subscriptionName,
      message: message,
      error: error,
    });
  } catch (err) {
    res.render('pubsub', {
      error: error,
    });
    logger.error(`An error occurred: ${err.message}`);
  }
};

async function publishMessage() {
  const data = JSON.stringify({foo: 'bar'});
  try {
    logger.info('Publishing message started...');
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
    logger.info(`Publishing message ${data} ...`);
    const messageId = await pubSubClient
        .topic(topicName)
        .publishMessage({data: dataBuffer});

    logger.info(`Message ${messageId} published.`);
  } catch (err) {
    error += `${err.message} <br>`;
    logger.error(`An error occurred while publishing: ${err.message}`);
  }
}

async function listenForMessages() {
  try {
    const numMessages = 10;
    let result;

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
      result = message.message.data;
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
    return result;
  } catch (err) {
    error += `${err.message} <br>`;
    logger.error(
      `An error occurred while retrieving subscriptions: ${err.message}`,
    );
  }
}

module.exports = {pubSub, tryPubSub};
