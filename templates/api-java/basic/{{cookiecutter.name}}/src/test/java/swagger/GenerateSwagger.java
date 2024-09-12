/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-12-2022
Description: Entry point to generate a OpenAPI 3.0 file. Run in maven with:

    mvn test -Dtest=GenerateSwagger

===========================================================================
*/
package swagger;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.telus.samples.Application;

@SpringBootTest(classes = Application.class)    // Run Spring app from Application
public class GenerateSwagger {

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp(WebApplicationContext context) {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    /**
     * Reads the Swagger documentation from the default Springdoc endpoint then write it to a JSON file.
     * This file is the Swagger file.
     */
    @Test
    public void generateSwagger() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/v3/api-docs").accept
        (MediaType.APPLICATION_JSON))
            .andDo((result) -> {

                Gson gson = new GsonBuilder().setPrettyPrinting().create();
                JsonElement el = JsonParser.parseString(result.getResponse().getContentAsString());
                Path filePath = Paths.get("api/example.oas3.json");
                Files.createDirectories(filePath.getParent()); 
                Files.writeString(
                    filePath,
                    gson.toJson(el),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.TRUNCATE_EXISTING);
            });

    }
}
