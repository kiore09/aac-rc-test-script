/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-12-2022
Description: Sample configuration class for Springdoc OpenAPI 3.0, many
"upper-level" fields in the swagger JSON are defined here.
===========================================================================
*/
package com.telus.samples.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.ExternalDocumentation;
// import org.springdoc.core.models.GroupedOpenApi; // Uncomment this line if you want to use GroupedOpenApi


@Configuration 
public class SwaggerConfig {
  @Bean
  OpenAPI customOpenAPI() {
    OpenAPI openAPI = new OpenAPI()
    .info(new Info().title("Sample API with Springdocs")
    .description("This is a simple API application made with Spring Boot 3.0 and Springdocs")
    .version("v0.0.1")
    .license(new License().name("Apache 2.0").url("http://springdoc.org")))
    .externalDocs(new ExternalDocumentation()
    .description("Springdoc OpenAPI 3.0 Documentation")
    .url("https://github.com/springdoc/springdoc-openapi"));

openAPI.addExtension("x-api-engagement-num", "910");
openAPI.addExtension("x-apiname", "demoApiName");
openAPI.addExtension("x-cmdbid", "21740");
openAPI.addExtension("x-responsetime", "3000");
openAPI.addExtension("x-tmfdomain", "common");
openAPI.addExtension("x-tps", "1000");

return openAPI;
  };
/**
 * This is an example GroupedOpenApi or group definition for the 'user' group. 
 * The paths included in this group are '/user/*' and '/users'. 
 * The OpenAPI documentation for this group will be available at http://localhost:8080/v3/api-docs/user
 */

    // @Bean
    // GroupedOpenApi userOpenApi() {
    //   String paths[] = {"/user/*", "/users"};
    //   return GroupedOpenApi.builder()
    //       .group("user")
    //       .pathsToMatch(paths)
    //       .build();
    // };
}