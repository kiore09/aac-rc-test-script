/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 07-04-2022
Description: This sample controller demonstrates 2 different ways to
retrieve secrets from Google Cloud Secret Manager:
- Through Spring annotations
- Through Secret Manager API at run-time
Both use a secret's id to retrieve the secret's value.
===========================================================================
*/
package com.telus.samples.secret;

import org.springframework.web.bind.annotation.GetMapping;

import com.telus.samples.utils.SecretManagerAccess;
import com.telus.samples.utils.StringMask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
public class SecretController{

    private static final Logger logger = LoggerFactory.getLogger(SecretController.class);

    private SecretManagerAccess secretManagerAccess;

    // Reads application.properties for secret's id, and loads the secret value during initialization
    @Value("${example.secret.id.auto}")
    private String annotationSecret = "test";

    // Reads application.properties for secret's id, without resolution
    @Value("${example.secret.id.code}")
    private String secretId;

    @Autowired
    public SecretController(SecretManagerAccess secretManagerAccess) {
        this.secretManagerAccess = secretManagerAccess;
    }

    /**
     * GET /secret endpoint (e.g. localhost:8080/secret) that returns the Secret
     * Manager access demo webpage template.
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/secret")
    public String getSecretPage(Model model) {
        model.addAttribute("annoSecret", StringMask.mask(annotationSecret)); // Display secret loaded via annotation
        model.addAttribute("secretId", secretId);

        // Set initial display message
        model.addAttribute("secretData", "You should already have created a secret with which you can test");

        return "secret";    // Serves the secret.html template
    }

    /**
     * GET /secret/value endpoint (e.g. localhost:8080/secret/value) that
     * retrieves the secret value with the unresolved secret id and displays it on
     * the webpage template.
     * 
     * @param secretId Backing object that stores the secret id given by the user
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/secret/value")
    public String getSecretByAPI(Model model) {

        try {
            // Use secret manager API to get the secret
            String secretValue = StringMask.mask(secretManagerAccess.getSecretValue());
            logger.info("Retrieved secret value");
        
            // Display the secret's value on template
            model.addAttribute("secretData", "Retrieved secret value (masked): " + secretValue);

        } catch (Throwable ex) {
            // Exception occurred, notify user
            logger.error("Exception caught", ex);
            model.addAttribute("secretData", "ERROR: Exception caught - " + ex.getMessage());
        }
            
        model.addAttribute("annoSecret", StringMask.mask(annotationSecret)); // Display secret loaded via annotation
        model.addAttribute("secretId", secretId);

        return "secret";    // Serves the secret.html template
    }
}
