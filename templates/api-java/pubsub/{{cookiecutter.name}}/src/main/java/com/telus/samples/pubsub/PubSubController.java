/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 17-06-2022
Description: This sample controller demonstrates the use of the Google
Cloud Pub/Sub client library to publish messages to a Pub/Sub topic and consume messages from a subscription.

The application uses Thymeleaf as an HTML templating engine. The templates
can be found under the src/main/resources/templates directory.
===========================================================================
*/
package com.telus.samples.pubsub;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.google.cloud.pubsub.v1.AckReplyConsumer;
import com.google.cloud.pubsub.v1.MessageReceiver;
import com.google.cloud.pubsub.v1.Subscriber;
import com.google.cloud.pubsub.v1.Publisher;
import com.google.pubsub.v1.ProjectSubscriptionName;
import com.google.pubsub.v1.PubsubMessage;
import com.google.api.core.ApiFuture;
import com.google.protobuf.ByteString;
import com.google.pubsub.v1.TopicName;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Controller
public class PubSubController {
  private static final Logger logger = LoggerFactory.getLogger(PubSubController.class);

  @Autowired
  private Environment environment;
  static final String EXMSG = "Exception caught";

  /**
  * Server endpoint for GET /pubsub (e.g. localhost:8080/pubsub) that creates
  * a Sample PubData backing object for the /pubsub page.
  * 
  * @param model Model map containing attributes that are mapped to variables in the returned template
  * @return Name of the template to be served
  */
	@GetMapping("/pubsub")
  public String pubSubPage(Model model) {
      // Set backing object to store user's input publish message
      model.addAttribute("backing", new PubData());

      return "pubsub";   // Serves the pubsub.html template
  }

  /**
  * Server endpoint for POST /pubsub (e.g. localhost:8080/pubsub) that publishes
  * a message and then listens for it
  * 
  * @param model Model map containing attributes that are mapped to variables in the returned template
  * @return Name of the template to be served
  */
	@PostMapping("/pubsub")
	public String pubSub(@ModelAttribute PubData pubData, Model model) {
    try {
      String projectId = environment.getProperty("example.pubsub.project_id");
      String subscriptionId = environment.getProperty("example.pubsub.subscription_name");
      String topicId = environment.getProperty("example.pubsub.topic_name");

      model.addAttribute("topic", "Topic: " + topicId);
      model.addAttribute("subscription", "Subscription: " + subscriptionId);

      // Publish a message to a topic
      model.addAttribute("pubResult", publishMessage(projectId, topicId, pubData));
      // Receive a message from a subscription
      model.addAttribute("subResult", listenForMessage(projectId, subscriptionId));

      } catch (Exception ex) {
        logger.error(EXMSG, ex);
        model.addAttribute("excdata", "ERROR: Exception caught - " + ex.getMessage());
      }
      return "result";   // Serves the result.html template
	}

  private String publishMessage(String projectId, String topicId, PubData pubData) {
    TopicName topicName = TopicName.of(projectId, topicId);
    Publisher publisher = null;
    String result = "";

    try {
      // Create a publisher instance with default settings bound to the topic
      publisher = Publisher.newBuilder(topicName).build();

      String message = pubData.getPublishMessage();
      ByteString data = ByteString.copyFromUtf8(message);
      PubsubMessage pubsubMessage = PubsubMessage.newBuilder().setData(data).build();

      // Once published, returns a server-assigned message id (unique within the topic)
      ApiFuture<String> messageIdFuture = publisher.publish(pubsubMessage);
      String messageId = messageIdFuture.get();
      logger.info("Published message ID: {}", messageId);
      result = "Message ID " + messageId + ": " + message;
    } catch (Exception ex) {
      logger.error(EXMSG, ex);
    } finally {
      if (publisher != null) {
        // When finished with the publisher, shutdown to free up resources.
        publisher.shutdown();
        try {
          publisher.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException ex) {
          logger.error(EXMSG, ex);
          Thread.currentThread().interrupt();
        }
        
      }
    }
    return result;
  }

  private String listenForMessage(String projectId, String subscriptionId) {
    // Storing the result String in a wrapper so the message can be accessed outside of
    // the MessageReceiver lambda
    var result = new Object(){ String res = ""; };

    ProjectSubscriptionName subscriptionName =
    ProjectSubscriptionName.of(projectId, subscriptionId);

    // Instantiate an asynchronous message receiver.
    MessageReceiver receiver =
      (PubsubMessage recMessage, AckReplyConsumer consumer) -> {
        // Handle incoming message, then ack the received message.
        logger.info("Id: {}", recMessage.getMessageId());
        logger.info("Data: {}", recMessage.getData());
        result.res += "Message received: " + recMessage.getData().toStringUtf8();
        consumer.ack();
    };

    Subscriber subscriber = null;
    try {
      subscriber = Subscriber.newBuilder(subscriptionName, receiver).build();
      // Start the subscriber.
      subscriber.startAsync().awaitRunning();
      logger.info("Listening for messages on {}", subscriptionName);
      // Allow the subscriber to run for 5s unless an unrecoverable error occurs.
      subscriber.awaitTerminated(5, TimeUnit.SECONDS);
    } catch (TimeoutException timeoutException) {
      // Shut down the subscriber after 5s. Stop receiving messages.
      subscriber.stopAsync();
    }
    return result.res;
  }
}
