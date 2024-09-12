/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 14-10-2022
Description: This class demonstrates how to generate an OAuth2 token,
create a multipart/form-data request body, and send a request to an API
endpoint with the token and body. In particular, this implementation is
calling an email proxy endpoint.
===========================================================================
*/
package com.telus.samples.email;

import java.io.IOException;

import javax.net.ssl.SSLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;

import com.telus.samples.exception.ResponseStatusException;
import com.telus.samples.model.Token;
import com.telus.samples.utils.SecretManagerAccess;

import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeFilterFunctions;

import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;

@Controller
public class EmailController {
    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);

    private SecretManagerAccess secretManagerAccess;

    @Value("${example.api.scope}")
    private String scope;

    @Value("${example.api.endpointUrl}")
    private String endpointUrl;

    @Value("${example.api.tokenUrl}")
    private String tokenUrl;

    @Value("${example.api.fromDomain}")
    private String fromDomain;

    public EmailController (@Autowired SecretManagerAccess secretManagerAccess) {
        this.secretManagerAccess = secretManagerAccess;
    }

    /**
     * GET /email endpoint (e.g. localhost:8080/email) that returns the email demo webpage
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/email")
    public String getEmailPage(Model model) {
        model.addAttribute("backing", new FormData());
        model.addAttribute("fromDomain", fromDomain);
        return "email";    // Serves the email.html template
    }

    /**
     * POST /send-mail endpoint (e.g. localhost:8080/send-mail) that forwards email content to
     * an email proxy endpoint
     * 
     * @param formData Backing object that stores the email content given by the user
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @PostMapping("/send-mail")
    public String sendEmail(@ModelAttribute FormData formData, Model model) {
        try {
            // Get OAuth2 token
            Token token = getToken();

            // Build the request's body
            MultiValueMap<String, HttpEntity<?>> multipartBody = buildMultipartBody(formData);

            // Call the email proxy endpoint
            ResponseEntity<String> response = emailToProxy(token, multipartBody);
            
            // Log and display resultant status
            logger.info("Send email response: " + response.getStatusCode() + " - " + response.getBody());
            model.addAttribute("message", "Send email response: " + response.getStatusCode() + " - " + response.getBody());

        } catch (ResponseStatusException ex) {
            // Unsuccessful response code, notify user
            logger.error("Unsuccessful response code: " + ex.getStatus(), ex);
            model.addAttribute("message", "Unsuccessful response code: " + ex.getStatus() + " - " + ex.getMessage());

        } catch (Throwable ex) {
            // Exception occurred, notify user
            logger.error("Exception caught", ex);
            model.addAttribute("message", "ERROR: Exception caught - " + ex.getMessage());

        }

        model.addAttribute("backing", new FormData());
        model.addAttribute("fromDomain", fromDomain);
        return "email";    // Serves the email.html template
    }

    /**
     * Helper method to retrieve the OAuth2 access token for the email endpoint
     * from the token endpoint
     * 
     * @return Token object containing the access token and other metadata
     */
    private Token getToken() throws IOException {
        // Get client id and secret from secret manager
        String clientId = secretManagerAccess.getClientId();
        String clientSecret = secretManagerAccess.getClientSecret();

        // Build web client with secrets
        WebClient tokenClient = WebClient.builder().baseUrl(tokenUrl)
            .filter(ExchangeFilterFunctions.basicAuthentication(clientId, clientSecret))
            .build();

        // Build token request and retrieve response
        Mono<Token> futureResponse = tokenClient.post()
            .uri(uriBuilder -> uriBuilder.queryParam("grant_type", "client_credentials")
                .queryParam("scope", scope)
                .build())
            .retrieve()
            .onRawStatus(status -> (status < 600 && status >= 400), response -> {
                int rawStatus = response.statusCode().value();
                return response.bodyToMono(String.class).map(body -> new ResponseStatusException(body, rawStatus));
            })
            .bodyToMono(Token.class);   // Bind response body to a Token object
        Token token = futureResponse.block();   // Wait for response

        logger.info("Token received");
        return token;
    }

    /**
     * Helper method to build the multipart/form-data body
     * 
     * @param formData Object containing the email's contents
     * @return MultiValueMap that encapsulates the contents of the request body
     */
    private MultiValueMap<String, HttpEntity<?>> buildMultipartBody(FormData formData) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("from", formData.getSender());
        builder.part("to", formData.getReceiver());
        builder.part("subject", formData.getSubject());
        builder.part("bodyText", formData.getBody());

        if (formData.getIsHtmlBody()) {
            builder.part("isHtmlBody", "true");
        }

        if (formData.getCc() != null && !formData.getCc().isEmpty()) {
            builder.part("cc", formData.getCc());
        }
        if (formData.getBcc() != null && !formData.getBcc().isEmpty()) {
            builder.part("bcc", formData.getBcc());
        }
        
        if (formData.getAttachment() != null && formData.getAttachment().length > 0) {
            logger.info("Attachment > 0");
            for (MultipartFile file: formData.getAttachment()){
                builder.part("attachment", file.getResource());
            }
        }

        logger.info("Multipart body created");
        return builder.build();
    }


    /**
     * Helper method for sending an email message's contents to the email proxy
     * service (with authentication token)
     * 
     * @param token Access token to be used when sending a request to the proxy
     * @param multipartBody Body of the request in multipart/form-data format
     * @return Response from the proxy endpoint
     */
    private ResponseEntity<String> emailToProxy(Token token, MultiValueMap<String, HttpEntity<?>> multipartBody) throws SSLException {
        // No SSL verification
        SslContext sslContext = SslContextBuilder
        .forClient()
        .trustManager(InsecureTrustManagerFactory.INSTANCE)
        .build();
        HttpClient httpClient = HttpClient.create().secure(t -> t.sslContext(sslContext));
        
        // Call API endpoint with token and body
        Mono<ResponseEntity<String>> futureResponse = WebClient.builder().clientConnector(new ReactorClientHttpConnector(httpClient)).build()
            .post()
            .uri(endpointUrl)
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .header("Authorization", "Bearer " + token.getAccessToken())    // Insert token in authorization header
            .body(BodyInserters.fromMultipartData(multipartBody))   // Insert body data
            .retrieve()
            // Using "raw status" instead of "status" since Spring cannot handle non-standard status codes
            .onRawStatus(status -> (status < 600 && status >= 400), response -> {
                int rawStatus = response.statusCode().value();
                return response.bodyToMono(String.class).map(body -> new ResponseStatusException(body, rawStatus));
            })
            .toEntity(String.class);   // Bind response body to a ResponseEntity<String> object

        logger.info("Sending email...");
        return futureResponse.block();
    }
}
