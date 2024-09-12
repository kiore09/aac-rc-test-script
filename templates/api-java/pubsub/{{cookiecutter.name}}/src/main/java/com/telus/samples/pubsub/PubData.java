/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 17-06-2022
Description: This is a sample class for a backing object that stores
data entered into the pubsub webpage. In particular, we store the
message.
===========================================================================
*/
package com.telus.samples.pubsub;

public class PubData {

	private String publishMessage;

   	public void setPublishMessage(String message) {
 		this.publishMessage = message;
	}

	public String getPublishMessage() {
		return publishMessage;
	}

}
