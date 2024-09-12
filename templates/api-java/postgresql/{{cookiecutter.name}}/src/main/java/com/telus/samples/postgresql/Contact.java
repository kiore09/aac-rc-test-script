/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 06-27-2022
Description: This class stores information related to contacts from the
contacts db table
===========================================================================
*/
package com.telus.samples.postgresql;

import java.util.Objects;

public class Contact{
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String createdOn;

    public Contact(int id, String firstName, String lastName, String email, String createdOn) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.createdOn = createdOn;
    }

    public int getId() {
        return this.id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public String getCreatedOn() {
        return this.createdOn;
    }

    public String getString() {
        return String.format("%d %s %s %s %s", this.id, this.firstName, this.lastName, this.email, this.createdOn);
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Contact)) {
            return false;
        }
        Contact c = (Contact) o;
        return this.id == c.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.firstName, this.lastName);
    }
}