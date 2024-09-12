/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 07-04-2022
Description: This sample application demonstrates EDA Publisher using access
to a firestore collection on GCP.
===========================================================================
*/
package com.telus.samples.publisher;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;

@Controller
public class PublisherController{
    private static final Logger logger = LoggerFactory.getLogger(PublisherController.class);

    @Autowired
    private Environment environment;

    private String projectId = "";
    private String collectionName = "";

    /**
     * Server endpoint that retrieves the documents belonging to a specified project's firestore
     * collection whenever a client hits GET /firestore (e.g. localhost:8080/publisher)
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/publisher")
    public String publisherDisplay(Model model) {
        try {
            // Retrieve project ID and name of collection to be accessed
            projectId = environment.getProperty("example.project.id");
            collectionName = environment.getProperty("example.publisher.collection");
            model.addAttribute("projectId", projectId);
            model.addAttribute("collectionName", collectionName);

        } catch (Throwable ex) {
            logger.error("Exception caught", ex);
            model.addAttribute("error", "ERROR: Exception caught - " + ex.getMessage());
        } finally {
            // Set backing object to store user's input data
            model.addAttribute("backing", new PayloadData());
        }

        return "publisher";
    }

    /**
     * Server endpoint for POST /publisher (e.g. localhost:8080/publisher) that adds
     * a document to the firestore collection
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
	@PostMapping("/publisher")
	public String publisherSubmit(@ModelAttribute PayloadData payloadData, Model model) {

        // Retrieve project ID and name of collection to be accessed
        String projectId = environment.getProperty("example.project.id");
        String collectionName = environment.getProperty("example.publisher.collection");

        // Initialize firestore service
        try (Firestore fireStoredb = FirestoreOptions.getDefaultInstance().toBuilder()
            .setProjectId(projectId)
            .build()
            .getService()){
        
            // Create the document and add it to the firestore collection
            Map<String, Object> data = new HashMap<>();
            data.put("payload", payloadData.getPayload());
            data.put("created_by", "demo-publisher");
            data.put("created_time", FieldValue.serverTimestamp());
            ApiFuture<DocumentReference> addedDocRef = fireStoredb.collection(collectionName).add(data);
            model.addAttribute("result", String.format("Document %s was created successfully!", addedDocRef.get().getId()));

        } catch(Throwable ex) {
            logger.error("Exception caught", ex);
            model.addAttribute("error", "ERROR: Exception caught - " + ex.getMessage());
        } finally {
            model.addAttribute("projectId", projectId);
            model.addAttribute("collectionName", collectionName);
            // Set backing object to store user's input data
            model.addAttribute("backing", new PayloadData());
        }
        return "publisher";
	}
}