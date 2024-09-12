/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 10-06-2022
Description: This sample application demonstrates access to a firestore
collection on GCP.
===========================================================================
*/
package com.telus.samples.firestore;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;

@Controller
public class FirestoreController{
    private static final Logger logger = LoggerFactory.getLogger(FirestoreController.class);

    @Autowired
    private Environment environment;

    /**
     * Server endpoint that retrieves the documents belonging to a specified project's firestore
     * collection whenever a client hits GET /firestore (e.g. localhost:8080/firestore)
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/firestore")
    public String firestoreDisplay(Model model) {
        try {
            // Retrieve project ID and name of collection to be accessed
            String projectId = environment.getProperty("example.project.id");
            String collectionName = environment.getProperty("example.firestore.collection");
            model.addAttribute("collectionName", collectionName);

            // Initialize firestore service
            try (Firestore fireStoredb = FirestoreOptions.getDefaultInstance().toBuilder()
                .setProjectId(projectId)
                .build()
                .getService()){
            
                // Retrieve documents under the collection asynchronously
                ApiFuture<QuerySnapshot> query = fireStoredb.collection(collectionName).get();

                // You can execute other lines of code here and the query above will not block execution

                // query.get() will block execution until the document retrieval is complete
                QuerySnapshot querySnapshot = query.get();
                List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();

                // A non-existent collection is equivalent to an empty collection in firestore
                if (documents.isEmpty()) {
                    model.addAttribute("error", "Collection is empty!");
                } else {
                    // Display the documents under the collection
                    List<String> resultList = new ArrayList<>();

                    for (QueryDocumentSnapshot doc : documents) {
                        resultList.add(doc.getId() + ": " +doc.getData().toString());
                    }
                    model.addAttribute("docList", resultList);
                }
                return "firestore";
            }

        } catch(Throwable ex) {
            logger.error("Exception caught", ex);
            model.addAttribute("error", "ERROR: Exception caught - " + ex.getMessage());
            return "firestore";
        }
    }
}