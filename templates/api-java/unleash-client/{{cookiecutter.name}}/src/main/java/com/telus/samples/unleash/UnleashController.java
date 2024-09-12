/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 08-01-2023
Description: This sample controller demonstrates a way to check for a toggle's status
===========================================================================
*/

package com.telus.samples.unleash;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import io.getunleash.Unleash;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

@Controller
public class UnleashController {
    private static final Logger logger = LoggerFactory.getLogger(UnleashController.class);
    private Unleash unleash;

    @Value("${example.unleash.flagName}")
    private String toggleName;

    @Autowired
    public UnleashController(Unleash unleash) {
        this.unleash = unleash;
    }

    @GetMapping("/unleashFlags")
    public String unleashFlags(Model model) {

        //checking if a toggle is enabled
        try {
            String toggle = "unknown";
            if (unleash.isEnabled(toggleName)) {
                logger.info(toggleName + " is enabled");
                toggle = "true";
            } else {
                logger.info(toggleName + " is disabled");
                toggle = "false";
            }

            //Getting current timestamp to display alongside toggle status
            Date now = new Date();
            SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            isoFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            String isoDate = isoFormat.format(now);

            model.addAttribute("toggleName", toggleName);
            model.addAttribute("toggle", toggle);
            model.addAttribute("time", isoDate);

            return "unleash";
            
        } catch(Throwable ex) {
            logger.error("Exception caught", ex);
            model.addAttribute("error", "ERROR: Exception caught - " + ex.getMessage());
            return "unleash";
        }
    }
}