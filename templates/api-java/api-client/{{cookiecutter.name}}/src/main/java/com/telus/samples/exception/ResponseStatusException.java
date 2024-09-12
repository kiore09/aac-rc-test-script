package com.telus.samples.exception;

/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 03-10-2022
Description: Exception class containing the status code and message of a
4xx or 5xx server response
===========================================================================
*/

public class ResponseStatusException extends RuntimeException{
    
    private int status;

    public ResponseStatusException(String msg, int status) {
        super(msg);
        this.status = status;
    }

    public int getStatus() {
        return this.status;
    }
}
