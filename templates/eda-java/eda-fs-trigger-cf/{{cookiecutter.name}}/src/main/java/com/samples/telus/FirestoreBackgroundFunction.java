package com.samples.telus;

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 08-20-2024
Description: Entry point class of the Cloud Function, as specified in
cloudbuild.yaml. This function:
- Extracts the ID of a Firestore document from a Firestore event
- Publishes a message containing the document ID to a Pub/Sub topic
===========================================================================
*/

import com.google.cloud.functions.CloudEventsFunction;
import io.cloudevents.CloudEvent;
import com.google.cloud.pubsub.v1.Publisher;
import com.google.pubsub.v1.PubsubMessage;
import com.google.pubsub.v1.TopicName;
import com.google.protobuf.ByteString;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.events.cloud.firestore.v1.DocumentEventData;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

public class FirestoreBackgroundFunction implements CloudEventsFunction {
    private static final Logger logger = Logger.getLogger(FirestoreBackgroundFunction.class.getName());

    @Override
    public void accept(CloudEvent event) throws InvalidProtocolBufferException {
        // Log the raw CloudEvent data
        logger.info("RECEIVED CloudEvent DATA==========: " + new String(event.getData().toBytes()));

        String edaTopic = System.getenv("EDA_TOPIC");
        String projectId = System.getenv("GCP_PROJECT");

        if (edaTopic == null) {
            logger.severe("Pubsub Topic not configured!");
            return;
        }

        if (projectId == null) {
            logger.severe("GCP Project ID not configured!");
            return;
        }

        TopicName topicName = TopicName.of(projectId, edaTopic);
        Publisher publisher = null;

        try {
            // Parse the event data as DocumentEventData
            DocumentEventData documentEventData = DocumentEventData.parseFrom(event.getData().toBytes());
            
            // Extract relevant fields from DocumentEventData
            String triggerResource = documentEventData.getValue().getName();

            logger.info(String.format("Function started, edaTopic: %s, triggered by event on: %s", edaTopic, triggerResource));

            // Create a publisher instance with default settings bound to the topic
            publisher = Publisher.newBuilder(topicName).build();

            // Construct the message and publish it
            String messageString = "{\"data\": {\"documentid\": \"" + triggerResource + "\"}}";
            ByteString data = ByteString.copyFromUtf8(messageString);
            PubsubMessage pubsubMessage = PubsubMessage.newBuilder().setData(data).build();

            // Once published, returns a server-assigned message id (unique within the topic)
            String messageId = publisher.publish(pubsubMessage).get();
            logger.info("Published message ID: " + messageId);
            logger.info("Published message: " + messageString);

        } catch (Exception ex) {
            logger.severe("Exception caught: " + ex);
        } finally {
            if (publisher != null) {
                try {
                    publisher.shutdown();
                    publisher.awaitTermination(1, TimeUnit.MINUTES);
                } catch (Throwable ex) {
                    logger.severe("Exception caught: " + ex);
                }
            }
        }
    }
}
