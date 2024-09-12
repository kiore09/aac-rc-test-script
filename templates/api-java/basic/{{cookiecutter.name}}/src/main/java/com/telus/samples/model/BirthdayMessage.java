/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 28-11-2022
Description: Model object storing data to generate a birthday message.
===========================================================================
*/
package com.telus.samples.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class BirthdayMessage {

    private long diffDays;

    private String message;

    @JsonIgnore  //Do not add property to generated JSON
    private String name;

    public long getDiffDays() {
        return diffDays;
    }

    public void setDiffDays(long diffDays) {
        this.diffDays = diffDays;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
