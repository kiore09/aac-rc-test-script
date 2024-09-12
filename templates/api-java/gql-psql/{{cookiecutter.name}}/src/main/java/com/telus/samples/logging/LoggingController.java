/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 24-03-2022
Description: This sample application demonstrates the use of 'slf4j' logger
facade (on top of logback) in a typical Java Spring Boot application. The
application uses Thymeleaf as an HTML templating engine. The templates can
be found under the src/main/resources/templates directory.
===========================================================================
*/
package com.telus.samples.logging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoggingController{
    private static final Logger logger = LoggerFactory.getLogger(LoggingController.class);

    /**
     * Server endpoint that logs a sample info message to the logger whenever a client hits
     * GET /infoMsg (e.g. localhost:8080/infoMsg)
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/infoMsg")
    public String logInfo(Model model) {
        logger.info("This is a sample info message");
        model.addAttribute("msgType", "Info");  // Substitute "Info" for "${msgType}"
        return "logMessage";    // Serves the logMessage.html template
    }

    /**
     * Server endpoint that logs a sample warning message to the logger whenever a client hits
     * GET /warnMsg (e.g. localhost:8080/warnMsg)
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/warnMsg")
    public String logWarn(Model model) {
        logger.warn("This is a sample warning message");
        model.addAttribute("msgType", "Warning");   // Substitute "Warning" for "${msgType}"
        return "logMessage";    // Serves the logMessage.html template
    }

    /**
     * Server endpoint that logs a sample error message to the logger whenever a client hits
     * GET /errorMsg (e.g. localhost:8080/errorMsg)
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/errorMsg")
    public String errorInfo(Model model) throws Exception {
        logger.error("This is a sample error message");
        model.addAttribute("msgType", "Error"); // Substitute "Error" for "${msgType}"
        return "logMessage";    // Serves the logMessage.html template
    }
}