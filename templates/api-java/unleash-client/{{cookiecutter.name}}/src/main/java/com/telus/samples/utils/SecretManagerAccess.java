/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Description: Class that retrieves and caches secret values from the Secret
Manager of a given GCP project.
===========================================================================
*/
package com.telus.samples.utils;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;

@Component
public class SecretManagerAccess {

    // Reads application.properties for secret's id, without resolution
    @Value("${example.unleash.secretName.code}")
    private String secretId;
    private String secretValue;

    @Value("${example.unleash.GCPprojectId}")
    private String projectId;

    private String getSecretString(String secretName) throws IOException {
        try (SecretManagerServiceClient client = SecretManagerServiceClient.create()) {
            return client.accessSecretVersion("projects/" + projectId + "/secrets/" + secretName + "/versions/latest")
                .getPayload()
                .getData()
                .toStringUtf8();
        }
    }

    public String getSecretValue() throws IOException {
        if (secretValue == null) {
            secretValue = getSecretString(secretId);
        }
        return secretValue;
    }
}
