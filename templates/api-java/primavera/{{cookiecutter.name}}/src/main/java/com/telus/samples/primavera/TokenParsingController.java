/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 20-02-2023
Description: This class demonstrates how to extract the ID token given by
Primavera, and parse it to extract values (in this case, the given and
family name of the user.)
===========================================================================
*/
package com.telus.samples.primavera;


import java.util.Base64;
import java.util.Map;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Controller
public class TokenParsingController {
    private static final Logger logger = LoggerFactory.getLogger(TokenParsingController.class);

    private static final Pattern SAFE_PATTERN = Pattern.compile("\\w*");

    /**
     * GET /names endpoint that displays the given and family name of the user that is logged in and
     * accessing this endpoint. Relies on Primavera to give the ID token (as a JWT)
     * 
     * @param headers Headers of the incoming request stored in a map
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/names")
    public String getNames(@RequestHeader Map<String, String> headers, Model model) {

        try {

            // Get ID JWT from header
            String jwt = headers.get("x-id-token");

            if (jwt != null) {

                // Extract JWT payload
                String[] jwtParts = jwt.split("\\.");
                String jwtPayload = jwtParts[1];

                // Decode payload (resolves to a JSON string)
                String payloadString = new String(Base64.getDecoder().decode(jwtPayload));

                // Parse payload into JSON object
                JsonObject payloadObj = (JsonObject) JsonParser.parseString(payloadString);

                // Display the given name and family name
                String givenName = payloadObj.get("given_name").getAsString();
                String familyName = payloadObj.get("family_name").getAsString();

                // Sanitize the values
                if (SAFE_PATTERN.matcher(givenName).matches() && SAFE_PATTERN.matcher(familyName).matches()) {
                    logger.info("Decoded - Given Name: " + givenName + ", Family Name: " + familyName);
                } else {
                    logger.warn("Invalid characters detected in given or family name");
                }

                model.addAttribute("givenName", givenName);
                model.addAttribute("familyName", familyName);

            } else {
                // Warn when ID JWT is not given
                logger.warn("No ID JWT given for request");
                model.addAttribute("errMsg", "No ID JWT given for request");
            }

        } catch (Throwable ex) {
            // Log error
            logger.error("Exception caught", ex);
            model.addAttribute("errMsg", ex.getMessage());
        }

        return "tokenName";    // Serves the tokenName.html template
    }
}