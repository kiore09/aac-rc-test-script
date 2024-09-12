/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 07-19-2022
Description: This sample controller demonstrates connecting to Cloud SQL
using credentials stored in Secret Manager and publishing a message to a 
pubsub topic after database insertion
===========================================================================
*/
package com.telus.samples.command;

import com.google.cloud.pubsub.v1.Publisher;
import com.google.pubsub.v1.PubsubMessage;
import com.google.api.core.ApiFuture;
import com.google.protobuf.ByteString;
import com.google.pubsub.v1.TopicName;
import com.google.gson.Gson;

import java.util.concurrent.TimeUnit;

import reactor.core.publisher.Mono;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.WebClient;


@Controller
public class CommandModelController{

    private static final Logger logger = LoggerFactory.getLogger(CommandModelController.class);

    // Reads application.properties for project id
    @Value("${example.project.id}")
    private String projectId;
    
    // Reads application.properties for pubsub topic
    @Value("${example.cqrsCMD.topicName}")
    private String topic;

    static final String EXCEPTION = "Exception caught ";

    static final String EXCDATA = "excdata";

    private Gson gson = new Gson();

    private final WebClient localApiClient;

    @Autowired
    public CommandModelController(WebClient localApiClient) {
        this.localApiClient = localApiClient;
    }

    /**
     * GET /command endpoint (e.g. localhost:8080/command) that returns the Commmand demo webpage template.
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/command")
    public String getCommandPage(Model model) {
        // Set backing object to store user's input data
        model.addAttribute("backing", new Customer());
        return "command";    // Serves the command.html template
    }

    /**
     * POST /command endpoint (e.g. localhost:8080/command) that returns the Commmand demo webpage template.
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @PostMapping("/command")
    public String createCommand(@ModelAttribute Customer customer, Model model) {
        try {
            // POST customer to /customer endpoint
            String message = gson.toJson(customer);
            Customer responseCustomer = localApiClient.post()
                .uri("/customer")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(Mono.just(customer), Customer.class)
                .retrieve()
                .bodyToMono(Customer.class)
                .block();

            publishMessage(model, responseCustomer);
            model.addAttribute("result", String.format("Created customer with info: %s", responseCustomer.toString()));

        } catch (Exception ex) {
            logger.error(EXCEPTION, ex);
            model.addAttribute(EXCDATA, EXCEPTION + ex.getMessage());
        }
        // Set backing object to store user's input data
        model.addAttribute("backing", new Customer());
        return "command";    // Serves the command.html template
    }

    private void publishMessage(Model model, Customer customer) {
        TopicName topicName = TopicName.of(projectId, topic);
        Publisher publisher = null;
        try {
            // Create a publisher instance with default settings bound to the topic
            publisher = Publisher.newBuilder(topicName).build();

            // Construct the message and publish it
            String message = gson.toJson(customer);

            ByteString data = ByteString.copyFromUtf8(message);
            PubsubMessage pubsubMessage = PubsubMessage.newBuilder().setData(data).build();

            // Once published, returns a server-assigned message id (unique within the topic)
            ApiFuture<String> messageIdFuture = publisher.publish(pubsubMessage);
            String messageId = messageIdFuture.get();
            logger.info("Published message: " + message);
        } catch (Throwable ex){
            logger.error(EXCEPTION, ex);
            model.addAttribute(EXCDATA, "ERROR: Exception caught - " + ex.getMessage());
        } finally {
            if (publisher != null) {
                // When finished with the publisher, shutdown to free up resources.
                try {
                    publisher.shutdown();
                    publisher.awaitTermination(1, TimeUnit.MINUTES);
                } catch (Throwable ex) {
                    logger.error(EXCEPTION, ex);
                    model.addAttribute(EXCDATA, "ERROR: Exception caught - " + ex.getMessage());
                }
            }
        }
    }
}