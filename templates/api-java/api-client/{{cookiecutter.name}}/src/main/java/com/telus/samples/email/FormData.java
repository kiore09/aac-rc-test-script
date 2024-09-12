/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 14-10-2022
Description: Backing object storing the contents given by the user in the
send-email UI.
===========================================================================
*/
package com.telus.samples.email;

import org.springframework.web.multipart.MultipartFile;

public class FormData {

	private String sender;
	private String receiver;
    private String cc;
    private String bcc;
    private String subject;
	private String body;
    private boolean isHtmlBody;
    private MultipartFile[] attachment;
    
    // Setters
   	public void setSender(String sender) {
 		this.sender = sender;
	}
   	public void setReceiver(String receiver) {
 		this.receiver = receiver;
	}
    public void setCc(String cc) {
        this.cc = cc;
    }
    public void setBcc(String bcc) {
        this.bcc = bcc;
    }
   	public void setSubject(String subject) {
 		this.subject = subject;
	}
   	public void setBody(String body) {
 		this.body = body;
	}
    public void setIsHtmlBody(boolean isHtmlBody) {
        this.isHtmlBody = isHtmlBody;
    }
   	public void setAttachment(MultipartFile[] attachment) {
 	 	this.attachment = attachment;
	}

    // Getters
	public String getSender() {
		return sender;
	}
	public String getReceiver() {
		return receiver;
	}
    public String getCc() {
        return cc;
    }
    public String getBcc() {
        return bcc;
    }
	public String getSubject() {
		return subject;
	}
	public String getBody() {
		return body;
	}
    public boolean getIsHtmlBody() {
        return isHtmlBody;
    }
	public MultipartFile[] getAttachment() {
		return attachment;
	}

}
