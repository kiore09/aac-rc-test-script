/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-02-2024
Description: Sample filter implementation that validates the value of a
header.
===========================================================================
*/
package com.telus.samples.filter;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

public class DemoFilter extends GenericFilterBean {
    
    private Logger logger = LoggerFactory.getLogger(DemoFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        // Request coming in
        logger.info("Incoming request: " + httpRequest.getMethod() + " - " + httpRequest.getRequestURI());

        // Generally speaking, authentication or any validation of globally required fields can be done here
        // This placeholder code checks that the "Connection" header is "keep-alive"
        String conHeader = httpRequest.getHeader("Connection");
        if (conHeader == null || !"keep-alive".equals(conHeader)) {
            logger.info("Filter error condition triggered");
            /* Uncomment to drop request and return specific error code
            response.sendError(405);
            return;
            */
        }

        // Pass to next filter
        chain.doFilter(request, response);

        // Response going out
        logger.info("Outgoing " + response.getContentType() + " response for: " + httpRequest.getMethod() + " - " + httpRequest.getRequestURI());
    }
}
