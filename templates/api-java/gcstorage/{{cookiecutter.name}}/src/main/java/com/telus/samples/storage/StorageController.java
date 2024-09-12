/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 08-09-2023
Description: This sample controller demonstrates the use of the Google
Cloud Storage client library to read blobs from a bucket, create new blobs,
and save those new blobs to a bucket.

The application uses Thymeleaf as an HTML templating engine. The templates
can be found under the src/main/resources/templates directory.
===========================================================================
*/
package com.telus.samples.storage;

import org.springframework.stereotype.Controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.api.gax.paging.Page;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

@Controller
public class StorageController {
    private static final Logger logger = LoggerFactory.getLogger(StorageController.class);

	@Autowired
    private Environment environment;
	
    /**
     * Server endpoint for GET /storage (e.g. localhost:8080/storage) that creates
     * a SampleBlobData backing object for the /storage page.
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
	@GetMapping("/storage")
	public String greetingForm(Model model) {

        try {
            // Get the bucket name from application.properties
		    String storage_bucket = environment.getProperty("example.storage.bucket");
		    model.addAttribute("bucketname", storage_bucket);

            // Get the project id from application.properties
		    String project_id = environment.getProperty("example.storage.project_id");

            // Get the Cloud Storage service
			Storage storage = StorageOptions.newBuilder().setProjectId(project_id).build().getService();

            // Gather all blobs in the bucket into a list and display on the webpage
            Page<Blob> blobs = storage.list(storage_bucket);
            List<Blob> blobList = new ArrayList<>();
            for (Blob blob : blobs.iterateAll()) {
                blobList.add(blob);
            }
            model.addAttribute("blobList", blobList);

		} catch (Throwable ex){
			logger.error("Exception caught", ex);
            ex.printStackTrace();
            model.addAttribute("excdata", "ERROR: Exception caught - " + ex.getMessage());
		}
        
        // Set backing object to store user's input blob data
		model.addAttribute("backing", new BlobData());

		return "storage";   // Serves the storage.html template
	}
  
    /**
     * Server endpoint for POST /storage (e.g. localhost:8080/storage) that creates
     * an empty blob in the bucket using the name stored in the SampleBlobData
     * backing object.
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
	@PostMapping("/storage")
	public String greetingSubmit(@ModelAttribute BlobData blobData, Model model) {

        try {
            // Get the bucket name from application.properties
		    String bucket = environment.getProperty("example.storage.bucket");

            // Get the project id from application.properties
		    String project_id = environment.getProperty("example.storage.project_id");
		
            // Get the Cloud Storage service
			Storage storage = StorageOptions.newBuilder().setProjectId(project_id).build().getService();

            // Generate id for new blob using the stored name
			BlobId blobId = BlobId.of(bucket, blobData.getBlobName());

            // Use the id to create a new blob and persist in storage
			BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("text/plain").build();
			storage.create(blobInfo, "Hello World!".getBytes(StandardCharsets.UTF_8));

            model.addAttribute("result", "Blob Name: " + blobData.getBlobName());
            
		} catch (Throwable ex){
			logger.error("Exception caught", ex);
            ex.printStackTrace();
            model.addAttribute("result", "ERROR: Exception caught - " + ex.getMessage());
		}
        return "result";    // Serves the result.html template
	}
}
