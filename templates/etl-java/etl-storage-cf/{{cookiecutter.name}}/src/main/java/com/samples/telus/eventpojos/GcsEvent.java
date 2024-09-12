package com.samples.telus.eventpojos;

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 29-05-2024
Description: POJO class that will contain the data from the storage event's
JSON body.
===========================================================================
*/

public class GcsEvent {
    // Retrieve the bucket's name and the file's name from the event JSON
    private String bucket;
    private String name;

    public String getBucket() {
        return bucket;
    }

    public void setBucket(String bucket) {
        this.bucket = bucket;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}