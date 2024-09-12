/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 07-14-2022
Description: This class stores information related to contacts from the
sample_customers db table
===========================================================================
*/
package com.telus.samples.command;

public class Customer{
    private int id; 
    private String firstName;
    private String lastName;
    private String dateOfBirth;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDateOfBirth() {
        return this.dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String toString() {
        return String.format("%d, %s, %s, %s", getId(), getFirstName(), getLastName(), getDateOfBirth());
    }

    public Boolean isEmpty() {
        return this.firstName == null || this.lastName == null || this.dateOfBirth == null;
    }
}