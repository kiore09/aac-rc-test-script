/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 06-27-2022
Description: This data transfer object class stores Contact objects that come 
from the contacts db table
===========================================================================
*/
package com.telus.samples.postgresql;

import java.util.ArrayList;
import java.util.List;

public class ContactsDto {
    private List<Contact> contacts;

    public ContactsDto() {
        contacts = new ArrayList<>();
    }

    public void addContact(Contact contact) {
        if (!contacts.contains(contact)) {
            this.contacts.add(contact);
        }
    }

    public List<Contact> getContacts() {
        return this.contacts;
    }
}