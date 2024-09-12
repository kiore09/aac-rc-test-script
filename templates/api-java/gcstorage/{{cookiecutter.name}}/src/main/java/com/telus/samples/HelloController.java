/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 21-04-2022
Description: Sample controller for the index page of the application.
===========================================================================
*/
package com.telus.samples;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloController {

    /**
     * Server endpoint that returns the index page (e.g. localhost:8080)
     * 
     * @return Name of the template to be served
     */
    @RequestMapping("/")
	public String index(){
        return "index";
    }
}
