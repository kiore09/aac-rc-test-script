'use strict'

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 04-10-2023
Description: This sample controller demonstrates the use of the Google
Cloud Pub/Sub client library to publish messages to a Pub/Sub topic and consume messages from a subscription.
The application uses Thymeleaf as an HTML templating engine. The templates
can be found under the src/views directory.
===========================================================================
*/
const pubsubUtil = require('../../utils/pubsub')
const { topicName, subscriptionName } = require('../../../config')

const getPubsub = async (request, reply) => {
	const message = await pubsubUtil.tryPubSub()
	reply.view('pubsub.ejs', { topicName, subscriptionName, message })
	return reply
}

module.exports = { getPubsub }
