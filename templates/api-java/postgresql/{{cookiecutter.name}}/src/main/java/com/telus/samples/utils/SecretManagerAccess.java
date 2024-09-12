/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 09-01-2023
Description: Class that retrieves and caches secret values from the Secret
Manager of a given GCP project. Here we are accessing the credentials for
generating an OAuth2 token.
===========================================================================
*/
package com.telus.samples.utils;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;

@Component
public class SecretManagerAccess {

    @Value("${example.postgresql.secretUserKey}")
    private String secretUserKey;
    private String secretUser;

    @Value("${example.postgresql.secretKeyName}")
    private String secretKeyName;
    private String secretPass;

    @Value("${example.postgresql.projectId}")
    private String projectId;

    private String getSecretString(String secretName) throws IOException {
        try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
            return client.accessSecretVersion("projects/" + projectId + "/secrets/" + secretName + "/versions/latest")
                .getPayload()
                .getData()
                .toStringUtf8();
        }
    }

    public String getUsername() throws IOException {
        if (secretUser == null) {
            secretUser = getSecretString(secretUserKey);
        }
        return secretUser;
    }

    public String getPassword() throws IOException {
        if (secretPass == null) {
            secretPass = getSecretString(secretKeyName);
        }
        return secretPass;
    }
}
