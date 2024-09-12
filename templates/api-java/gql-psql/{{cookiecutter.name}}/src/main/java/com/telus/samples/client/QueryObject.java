/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-08-2022
Description: Backing object for an input GraphQL query and its response.
===========================================================================
*/
package com.telus.samples.client;

public class QueryObject {
	private String queryString;
	private String queryResponse;
	public String getQueryString() {
		return queryString;
	}
	public void setQueryString(String queryString) {
		this.queryString = queryString;
	}
	public String getQueryResponse() {
		return queryResponse;
	}
	public void setQueryResponse(String queryResponse) {
		this.queryResponse = queryResponse;
	}
	
	public String toString() {
		return "Query Object = queryString : " + this.queryString + ", queryResp : " + this.queryResponse;
	}
}
