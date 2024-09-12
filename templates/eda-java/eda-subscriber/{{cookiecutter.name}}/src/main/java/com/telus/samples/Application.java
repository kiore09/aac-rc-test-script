package com.telus.samples;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.io.StringReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.pubsub.v1.AckReplyConsumer;
import com.google.cloud.pubsub.v1.MessageReceiver;
import com.google.cloud.pubsub.v1.Subscriber;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonReader;
import com.google.pubsub.v1.ProjectSubscriptionName;
import com.google.pubsub.v1.PubsubMessage;
import com.google.api.core.ApiFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@SpringBootApplication
public class Application {
	private static final Logger logger = LoggerFactory.getLogger(Application.class);

	@Autowired
  	private Environment environment;

	private String projectId;
	private String subscriptionId;

	static final int TIMER = 20; // Timer in seconds

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		projectId = environment.getProperty("example.subscriber.project_id");
		subscriptionId = environment.getProperty("example.subscriber.subscription_name");

		return args -> {
			String[] beanNames = ctx.getBeanDefinitionNames();
			Arrays.sort(beanNames);
			for (String beanName : beanNames) {
				System.out.println(beanName);
			}
		};
	}

	// Listens for new messages every TIMER seconds
	@Scheduled(fixedDelay = TIMER * 1000)
	public void listenForMessage() {
		try {
			// Storing the result String in a wrapper so the message can be accessed outside of
			// the MessageReceiver lambda
			ArrayList<String> docPaths = new ArrayList<String>();
		
			ProjectSubscriptionName subscriptionName =
			ProjectSubscriptionName.of(projectId, subscriptionId);
		
			// Instantiate an asynchronous message receiver.
			// Message formats are assumed to be JSON in the form of:
			// {"data": {"documentid":"projects/PROJECT_ID/databases/(default)/documents/COLLECTION_NAME/DOCUMENT_ID"}}
			MessageReceiver receiver =
			(PubsubMessage recMessage, AckReplyConsumer consumer) -> {
				// Handle incoming message, then ack the received message.
				try {
          JsonReader jsonReader = new JsonReader(new StringReader(recMessage.getData().toStringUtf8()));
          JsonElement jelement = JsonParser.parseReader(jsonReader);
          JsonObject jobject = jelement.getAsJsonObject();
          String docPath = jobject.getAsJsonObject("data").get("documentid").getAsString();
          docPaths.add(docPath);
				} catch (Throwable ex) {
					logger.error("Exception caught " + ex);
				}
				consumer.ack();
			};
		
			Subscriber subscriber = null;
			try {
			subscriber = Subscriber.newBuilder(subscriptionName, receiver).build();
			// Start the subscriber.
			subscriber.startAsync().awaitRunning();
			// Allow the subscriber to run for TIMER seconds unless an unrecoverable error occurs.
			subscriber.awaitTerminated(TIMER, TimeUnit.SECONDS);
			} catch (TimeoutException timeoutException) {
			// Shut down the subscriber after TIMER seconds. Stop receiving messages.
			subscriber.stopAsync();
			}

			// Update firestore documents
			for (String docPath : docPaths) {
				updateDocument(docPath.split("/documents/")[1]);
			}
		} catch (Throwable ex) {
			logger.error("Exception caught " + ex);
		}
	  }

	  public void updateDocument(String docPath){
		Map<String, Object> data = new HashMap<>();
		data.put("updated_by", "demo_consumer");
		data.put("updated_time", FieldValue.serverTimestamp());

		// Setup firestore connection
		try (Firestore fireStoredb = FirestoreOptions.getDefaultInstance().toBuilder()
            .setProjectId(projectId)
            .build()
            .getService()){
				
			logger.info("Updating {}", docPath);
			DocumentReference docRef = fireStoredb.document(docPath);
			ApiFuture<WriteResult> future = docRef.update(data);
			logger.info("Document updated successfully!");

        } catch(Throwable ex) {
            logger.error("Exception caught " + ex);
        }
	  }
}

// Enables scheduling
@Configuration
@EnableScheduling
class SpringConfig {
	
}