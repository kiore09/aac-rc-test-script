/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 02-12-2022
Description: Object class demonstrating OpenAPI 3.0 annotation and
example values
===========================================================================
*/
package com.telus.samples.api;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User object")
public class User {

    @Schema(description = "User's id", example = "1")
    private long userId;

    @Schema(description = "First name of the user", example = "Alice")
    private String firstName;

    @Schema(description = "Last name of the user", example = "Smith")
    private String lastName;

    public User(long userId, String firstName, String lastName) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public long getUserId() {
        return userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}