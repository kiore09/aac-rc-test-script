package com.samples.telus;

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 03-06-2024
Description: Interacts with the Firestore database to save documents.
===========================================================================
*/

import java.util.Map;
import java.util.logging.Logger;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.firestore.WriteResult;

public class FirestoreService {

  private Firestore db;
  private String collectionName;
  private static final Logger logger = Logger.getLogger(FirestoreService.class.getName());
  
  public FirestoreService() {
    try {
      String projectId = System.getenv("GCP_PROJECT");
      if (projectId == null || projectId.isEmpty()) {
        throw new IllegalStateException("GCP Project ID is null or empty!");
      }
      collectionName = System.getenv("FIRESTORE_COLLECTION");
      if (collectionName == null || collectionName.isEmpty()) {
        throw new IllegalStateException("CQRS Firestore Collection name is null or empty!");
      }

      FirestoreOptions firestoreOptions = FirestoreOptions.getDefaultInstance().toBuilder()
        .setProjectId(projectId)
        .setCredentials(GoogleCredentials.getApplicationDefault())
        .build();
      db = firestoreOptions.getService();
    } catch(Exception e) {
      logger.severe("Exception caught while initializing Firestore DB connection : " + e.getMessage());
    }
  }

  public String getCollectionName() {
    return this.collectionName;
  }

  public ApiFuture<WriteResult> setDoc(String docId, Map<String, Object> docData) {
    return db.collection(collectionName)
      .document(docId)
      .set(docData);
  }
}
