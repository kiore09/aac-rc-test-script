/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 08-09-2022
Description: This controller includes a demo of a call to another service's
API, which is used during integration tests. The URLs for the token and
API calls are retrieved from the application.properties file
===========================================================================
*/
package com.telus.samples.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.reactive.function.client.ExchangeFilterFunctions;
import org.springframework.web.reactive.function.client.WebClient;

import com.telus.samples.model.Token;

import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

@Controller
public class DemoIntegrationTestController {
    private static final Logger logger = LoggerFactory.getLogger(DemoIntegrationTestController.class);

    @Value("${example.intTest.tokenUrl}")
    private String tokenUrl;

    @Value("${example.intTest.apiUrl}")
    private String apiUrl;

    /**
     * This controller endpoint demonstrates a typical call to another service's API.
     * First we retrieve an OAuth token, then make the API call with the token.
     * 
     * @return Http response returned from the call, with a JSON body
     */
    @GetMapping(value = "/integration/test", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getResponseFromApi() {

        try {
            logger.info("Retrieving token");

            WebClient tokenClient = WebClient.builder().baseUrl(tokenUrl)
                .filter(ExchangeFilterFunctions.basicAuthentication("someClientId", "someClientPassword"))
                .build();
            
            // Example call to get an authentication token
            Mono<Token> futureToken = tokenClient.post()
                .uri(uriBuilder -> uriBuilder.queryParam("grant_type", "client_credentials")
                    .queryParam("scope", "1234")
                    .build())
                .retrieve()
                .bodyToMono(Token.class);   // Bind response body to a Token object
            Token token = futureToken.block();   // Wait for response

            logger.info("Token retrieved, generating HTTP request");
            
            // Example HTTP call to an api, using the retrieved token
            SslContext sslContext = SslContextBuilder
                .forClient()
                .trustManager(InsecureTrustManagerFactory.INSTANCE)
                .build();
            HttpClient httpClient = HttpClient.create().secure(t -> t.sslContext(sslContext));
            
            Mono<ResponseEntity<String>> futureResponse = WebClient.builder().clientConnector(new ReactorClientHttpConnector(httpClient)).build()
                .post()
                .uri(apiUrl)
                //.contentType(MediaType.MULTIPART_FORM_DATA)   // Determine content type - not necessary for integration test demo
                .header("Authorization", "Bearer " + token.getAccessToken())    // Insert token in authorization header
                //.body(BodyInserters.fromMultipartData(multipartBody))   // Insert body data - not necessary for integration test demo
                .retrieve()
                .toEntity(String.class);   // Bind response body to a ResponseEntity<String> object
            
            ResponseEntity<String> apiResponse = futureResponse.block();

            logger.info("Response retrieved");
            
            return ResponseEntity.status(apiResponse.getStatusCode()).contentType(MediaType.APPLICATION_JSON)
                .body(apiResponse.getBody());

        } catch (Throwable ex) {
            logger.error("Exception caught: ", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
