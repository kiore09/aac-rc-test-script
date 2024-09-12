/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 28-11-2022
Description: Controller advice for modifying the returned JSON generated
when serializing the BirthdayMessage.
===========================================================================
*/
package com.telus.samples.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.telus.samples.model.BirthdayMessage;

@ControllerAdvice
public class BirthdayMessageBodyAdvice implements ResponseBodyAdvice<BirthdayMessage> {

    private Logger logger = LoggerFactory.getLogger(BirthdayMessageBodyAdvice.class);
    
    /**
     * Return true when this advice should be executed, false to ignore this advice
     */
    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        return returnType.getContainingClass() == DemoApiController.class && returnType.getParameterType() == BirthdayMessage.class;
    }

    /**
     * Modifies the returned BirthdayMessage from the controller, allowing us to edit the
     * view before writing the HTTP response
     */
    @Override
    public BirthdayMessage beforeBodyWrite(@Nullable BirthdayMessage msg, MethodParameter returnType, MediaType selectedContentType,
        Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request,
        ServerHttpResponse response) {
        
        if (msg != null) {
            logger.info("Modifying /birthday response body");
            msg.setMessage("Hello " + msg.getName() + ", you have " + msg.getDiffDays() + " more days before your birthday!");
        }

        return msg;
    }
}
