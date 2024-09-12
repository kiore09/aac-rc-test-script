package com.samples.telus;

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 03-06-2024
Description: POJO class that will contain the data from the Pub/Sub event. The
message data is encoded in Base64 format.
===========================================================================
*/
public class PubSubMessage {

  private String data;

  public String getData() {
    return data;
  }

  public void setData(String data) {
    this.data = data;
  }
}
