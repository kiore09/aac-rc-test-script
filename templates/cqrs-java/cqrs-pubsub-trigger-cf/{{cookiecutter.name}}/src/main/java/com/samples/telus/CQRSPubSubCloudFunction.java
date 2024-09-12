package com.samples.telus;

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 03-06-2024
Description: Entry point class of the Cloud Function, as specified in
cloudbuild.yaml. This function:
- Decodes the incoming Pub/Sub message data from Base64
- Builds a Firestore document from the decoded data and saves it3
===========================================================================
*/

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.functions.BackgroundFunction;
import com.google.cloud.functions.Context;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class CQRSPubSubCloudFunction implements BackgroundFunction<PubSubMessage> {
  private static final Logger logger = Logger.getLogger(CQRSPubSubCloudFunction.class.getName());

  private FirestoreService dbService;

  /**
   * Triggered by an incoming Pub/Sub message. The message data is decoded and
   * converted into a Firestore document, which is then saved.
   */
  @Override
  public void accept(PubSubMessage event, Context context) {
    dbService = new FirestoreService();
    String cqrsTopic = System.getenv("CQRS_TOPIC");

    logger.info(String.format("Function started, cqrsTopic: %s,  cqrsFirestoreCollection: %s",
      cqrsTopic, dbService.getCollectionName()));

    // For a valid Pub/Sub message, decode the data into a String - otherwise log an error
    if (event == null){
      logger.severe("Error: Pub/Sub event is null");
      return;
    } else if (event.getData() == null) {
      logger.severe("Error: Event data is null");
      return;
    }
    String decodedMsg = new String(
      Base64.getDecoder().decode(event.getData().getBytes(StandardCharsets.UTF_8)),
      StandardCharsets.UTF_8);
    logger.info("Received Pub/Sub data: " + decodedMsg);

    // Deserialize String data into a document for Firestore
    Map<String, Object> docData = new HashMap<>();
    Gson gson = new Gson();
    JsonObject jsonObject = gson.fromJson(decodedMsg, JsonObject.class);
    String docId = jsonObject.get("id").getAsString();
    docData.put("firstName", jsonObject.get("firstName").getAsString());
    docData.put("lastName", jsonObject.get("lastName").getAsString());
    docData.put("dateOfBirth", jsonObject.get("dateOfBirth").getAsString());

    try {
      ApiFuture<WriteResult> future = dbService.setDoc(docId, docData);
      logger.info("Update time : " + future.get().getUpdateTime());
      // ApiFuture .get() waits for the database update to complete, if necessary

    } catch (Throwable ex) {
      logger.severe("Exception caught: " + ex.getMessage());
    }
  }
}
