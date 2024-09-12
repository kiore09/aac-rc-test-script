/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-08-2022
Description: Controller class for the GraphQL client, for displaying the
webpage and submitting user input.
===========================================================================
*/
package com.telus.samples.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.reactive.function.client.WebClient;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.netflix.graphql.dgs.client.GraphQLResponse;
import com.netflix.graphql.dgs.client.MonoGraphQLClient;
import com.netflix.graphql.dgs.client.WebClientGraphQLClient;

import reactor.core.publisher.Mono;

import java.util.regex.Pattern;

@Controller
public class QueryController {

    private static final Logger logger = LoggerFactory.getLogger(QueryController.class);
    private String initialQuery = "{\n  customerList{\n   id\n   firstName\n   lastName\n   birthDate\n  }\n}";

    private static final Pattern SAFE_PATTERN = Pattern.compile("[\\w\\s{}:]+");

    /**
     * GET endpoint to display the GraphQL demo page
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/queryApi")
    public String showForm(Model model) {
        QueryObject obj = new QueryObject();
        obj.setQueryString(initialQuery);
        model.addAttribute("queryObj", obj);
        return "queryPage";
    }

    /**
     * POST endpoint to submit a query to the GraphQL server, and display its response
     * 
     * @param qryObj Backing object that holds an incoming query and its response
     * @return Name of the template to be served
     */
    @PostMapping("/queryApi")
    public String submitRequest(@ModelAttribute("queryObj") QueryObject qryObj) {
        // Sanitize user input by allowing only alphanumeric characters, spaces, and a few safe characters
        String queryString = qryObj.getQueryString();
        if (SAFE_PATTERN.matcher(queryString).matches()) {
            logger.info("Input param :: '{}'", queryString);

            // Query should be sent to the GraphQL server (in this case, it is a local endpoint)
            WebClient webClient = WebClient.create("http://localhost:8080/graphql");
            WebClientGraphQLClient client = MonoGraphQLClient.createWithWebClient(webClient);

            // The GraphQLResponse may contain data or an error
            Mono<GraphQLResponse> graphQLResponseMono = client.reactiveExecuteQuery(queryString);

            // GraphQLResponse has convenience methods to extract fields using JsonPath.
            Mono<String> responseString = graphQLResponseMono.map(r -> r.getJson());
            String response = responseString.block();   // Wait for response
            logger.info("Response from Graphql :: '{}'", response);

            // Pretty print GraphQL output
            JsonElement je = JsonParser.parseString(response);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            qryObj.setQueryResponse(gson.toJson(je));
        } else {
            logger.warn("Invalid characters detected in the query string");
        }
        return "queryPage";
    }
}