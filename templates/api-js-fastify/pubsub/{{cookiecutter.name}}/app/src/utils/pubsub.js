/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 04-10-2023
Description: This function setup the connection to pub/sub service and publish 
and pull a message.
===========================================================================
*/

const {PubSub} = require('@google-cloud/pubsub')
const {v1}= require('@google-cloud/pubsub')

const logger = require('../logger')
const subClient = new v1.SubscriberClient()

const connection = {
  projectId : null,
  topicName : null,
  subscriberName: null,
  pubSubClient : null
}
// Instantiates a client

const setupConnection = async(opts)=>{
  logger.info('Setting up the plugin')
  connection.projectId = opts.projectId
  connection.topicName = opts.topicName
  connection.subscriptionName = opts.subscriptionName
  connection.pubSubClient = new PubSub({projectId : opts.projectId})
}

const publishMessage = async(message)=>{
    //const dataBuffer = Buffer.from(message)
    logger.info('Publishing message :'+message)
    logger.info('Configuration param : '+connection.topicName)
    const data = Buffer.from(JSON.stringify(message))
    try{
        const topic = connection.pubSubClient.topic(connection.topicName)
        const messageId = await topic.publish(data)
        logger.info(`Message ${messageId} published.`)
        return messageId
    }catch(error){
        error += `${error.message} <br>`
      logger.error(`An error occurred while publishing: ${error}`)
        return error
    }
}

const pullMessage = async()=>{
  try {
    const numMessages = 10
    let result
    let subscriptionNameOrId = connection.subscriptionName

    // The maximum number of messages returned for this request.
    // Pub/Sub may return fewer than the number specified.
    const formattedSubscription = subscriptionNameOrId.indexOf('/') >= 0
    ? subscriptionNameOrId
    :  subClient.subscriptionPath(connection.projectId,connection.subscriptionName)
    const request = {
      subscription: formattedSubscription,
      maxMessages: numMessages,
    }
    
    logger.info(`Pulling messages from subscription name :  ${request.subscription}`)
    // The subscriber pulls a specified number of messages.
    const [response] = await subClient.pull(request)

    // Process the messages.
    const ackIds = []
    for (const message of response.receivedMessages) {
      logger.info(`Received message ${message.message.data}`)
      result = message.message.data
      ackIds.push(message.ackId)
    }

    if (ackIds.length !== 0) {
      // Acknowledge all of the messages.
      const ackRequest = {
        subscription: formattedSubscription,
        ackIds: ackIds,
      }
      await subClient.acknowledge(ackRequest)
    }
    return result
  } catch (error) {
    
    logger.error(
      `An error occurred while retrieving subscriptions: ${error}`,
    )
    return error
  }
}

/**
 * Server endpoint that returns view to test pubsub whenever a client hits
 * GET /pubsub (e.g. localhost:8080/pubsub)
 */
const tryPubSub = async () => {
  try {
    // Creates message on a topic
    const sampleMessage = 'Hello World!'
    await publishMessage(sampleMessage)

    // Retrieve subscriptions
    const message = await pullMessage()

    return message

  } catch (error) {
    logger.error(`An error occurred: ${error}`)
    return error
  }
}

module.exports = {
  publishMessage,
  setupConnection,
  pullMessage,
  tryPubSub
}
