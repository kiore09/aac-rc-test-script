/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 07-15-2022
Description: Sample API controller demonstrating a POST endpoint for creating a customer
===========================================================================
*/
package com.telus.samples.command;

import com.telus.samples.postgres.PostgresService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.extensions.Extension;
import io.swagger.v3.oas.annotations.extensions.ExtensionProperty;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;


@Controller
@ResponseBody   // Required for Springdocs to pick up this endpoint
@OpenAPIDefinition(
    info = @Info(
        title = "Sample API with Springdocs",
        version = "0.1.0",
        description = "This is a simple API application made with Spring Boot and documented with Springdocs",
        contact = @Contact(email = "someone@example.com", name = "Someone")
    ),
    tags = {
        @Tag(name = "x-apiname"),
        @Tag(name = "x-api-engagement-num"),
        @Tag(name = "x-cmdbid"),
        @Tag(name = "x-tps"),
        @Tag(name = "x-responsetime"),
        @Tag(name = "x-tmfdomain")
    },
    servers = {
        @Server(
            description = "Local Server URL",
            url = "http://localhost:8080"
        )
    },
    extensions = {
        @Extension(properties = @ExtensionProperty(name = "x-apiname", value = "demoAPI")),
        @Extension(properties = @ExtensionProperty(name = "x-api-engagement-num", value = "910")),
        @Extension(properties = @ExtensionProperty(name = "x-cmdbid", value = "21740")),
        @Extension(properties = @ExtensionProperty(name = "x-tps", value = "1000")),
        @Extension(properties = @ExtensionProperty(name = "x-responsetime", value = "3000")),
        @Extension(properties = @ExtensionProperty(name = "x-tmfdomain", value = "common")),
    }
)
public class CommandApiController {

    @Autowired
    PostgresService postgresService;

    @Operation(summary = "Create a new customer", description = "Creates a new user in the \"database\"", tags = { "users" })
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful operation",
            content = @Content(array = @ArraySchema(schema = @Schema(implementation = Customer.class))))})
    @PostMapping(value = "/customer", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    /**
     * POST endpoint that creates a new customer
     * 
     * @return Http response containing the created customer
     */
    public ResponseEntity createCustomer(@RequestBody Customer newCustomer) {
        try {
            if (newCustomer.isEmpty()){
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body("Empty fields");
            }
            postgresService.insertCustomer(newCustomer);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
        }
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }
}