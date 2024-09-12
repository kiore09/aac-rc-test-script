/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 07-04-2022
Description: This is a sample class for a backing object that stores
data entered into the webpage.
===========================================================================
*/
package com.telus.samples.publisher;

public class PayloadData {

	private String payload;

   	public void setPayload(String payload) {
 		this.payload = payload;
	}

	public String getPayload() {
		return payload;
	}

}
