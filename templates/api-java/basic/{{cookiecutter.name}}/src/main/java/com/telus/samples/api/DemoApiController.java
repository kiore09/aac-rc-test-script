/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-12-2022
Description: Sample API controller demonstrating the use of Swagger
annotations for generating an OpenAPI specification doc. The API doc is
generated when running the GenerateSwagger unit test.
===========================================================================
*/
package com.telus.samples.api;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.telus.samples.model.BirthdayMessage;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;


@Controller
public class DemoApiController {

    // This map acts as a mock database for our API - we initialize it with a couple of example values
    Map<Long, User> userMap = new HashMap<>();
    {
        userMap.put(1L, new User(1L, "Alice", "Smith"));
        userMap.put(2L, new User(2L, "Bob", "Smith"));
        userMap.put(3L, new User(3L, "Charlie", "Smith"));
        userMap.put(4L, new User(4L, "Help", "Me"));
    }

    @Operation(summary = "Get all users", description = "Returns all users in the \"database\" in a rendered view")
    @ApiResponses(value = { 
      @ApiResponse(responseCode = "200", description = "Successful operation") 
    })
    @GetMapping(value = "/users", produces = MediaType.TEXT_HTML_VALUE)
    /**
     * GET endpoint that returns all users in the userMap
     * 
     * @return Http response containing a list of users in the userMap (in JSON format)
     */
    public String getAllUsers(Model model) {
        List<User> usersList = new ArrayList<>();
        for (User user: userMap.values()) {
            usersList.add(user);
        }

        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        model.addAttribute("data", gson.toJson(usersList));

        return "jsonData";
    }

    @Operation(summary = "Get user by id", description = "Returns the user with the input id")
    @ApiResponses(value = { 
      @ApiResponse(responseCode = "200", description = "Successful operation"),
      @ApiResponse(responseCode = "404", description = "No user found with input id"),
      @ApiResponse(responseCode = "400", description = "Invalid input id") 
    })
    @GetMapping(value = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    /**
     * GET endpoint that returns the user specified by the input userId
     * 
     * @return Http response containing the user with the input userId (in JSON format)
     */
    public ResponseEntity<String> getUserById(@PathVariable(value = "userId") String idString) {
        try {
            Long userId = Long.parseLong(idString);
            User user = userMap.get(userId);
            if (user != null) {
                Gson gson = new GsonBuilder().create();
                String resString = gson.toJson(user);
                return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(resString);

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).contentType(MediaType.TEXT_PLAIN)
                    .body("No user with userId: " + userId);
            }
        } catch (NumberFormatException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN)
                .body("Could not parse userId: " + idString);
        }
        
    }

    /**
     * Returns the view of the GET "/birthday" endpoint
     */
    @GetMapping(value="/birthday", produces = MediaType.TEXT_HTML_VALUE)
    public String getBirthdayView() {
        return "birthday";
    }

    /**
     * Compute the number of days until the next birthday
     * 
     * @param name Name that this message will address
     * @param birthMonth Month of birth from 1 to 12
     * @param birthDay Day of birth from 1 to 31
     * @return Data for BirthdayMessage
     */
    @ResponseBody
    @PostMapping(value = "/birthday", produces = MediaType.APPLICATION_JSON_VALUE)
    public BirthdayMessage computeBirthday(@RequestParam String name, @RequestParam int birthMonth, @RequestParam int birthDay) {

        BirthdayMessage model = new BirthdayMessage();

        LocalDate now = LocalDate.now();
        LocalDate bDay;

        if (now.getMonthValue() > birthMonth) {
            bDay = LocalDate.of(now.getYear() + 1, birthMonth, birthDay);
        } else if (now.getMonthValue() == birthMonth && now.getDayOfMonth() > birthDay) {
            bDay = LocalDate.of(now.getYear() + 1, birthMonth, birthDay);
        } else {
            bDay = LocalDate.of(now.getYear(), birthMonth, birthDay);
        }

        long diffDays = ChronoUnit.DAYS.between(now, bDay);

        model.setDiffDays(diffDays);
        model.setName(name);

        return model;
    }
}