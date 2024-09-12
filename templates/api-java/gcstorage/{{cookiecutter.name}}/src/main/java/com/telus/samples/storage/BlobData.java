/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 28-03-2022
Description: This is a sample class for a backing object that stores
data entered into the blob creation webpage. In particular, we store the
blob's name.
===========================================================================
*/
package com.telus.samples.storage;

public class BlobData {

	private String blobName;

   	public void setBlobName(String blobName) {
 		this.blobName = blobName;
	}

	public String getBlobName() {
		return blobName;
	}

}
