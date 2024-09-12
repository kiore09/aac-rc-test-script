/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 08-04-2023
Description: Sample configuration class for Unleash, which makes use of SecretManagerAccess 
to retrieve the apiKey.
===========================================================================
*/

package com.telus.samples.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;

import io.getunleash.DefaultUnleash;
import io.getunleash.Unleash;
import io.getunleash.util.UnleashConfig;

import com.telus.samples.utils.SecretManagerAccess;

@Configuration
public class UnleashClientConfig {
    private static final Logger logger = LoggerFactory.getLogger(UnleashClientConfig.class);

    private SecretManagerAccess secretManagerAccess;

    @Value("${example.unleash.flagName}")
    private String toggleName;

    @Value("${example.unleash.apiUrl}")
    private String apiUrl;

    @Autowired
    public UnleashClientConfig(SecretManagerAccess secretManagerAccess) {
        this.secretManagerAccess = secretManagerAccess;
    }

    @Bean
    public Unleash unleash() {
        try {
            String secretValue = secretManagerAccess.getSecretValue();

            //client token // async initialization of SDK
            UnleashConfig config = UnleashConfig.builder()
                .appName("unleash-client-demo")
                .instanceId("demo-instance")
                .unleashAPI(apiUrl)
                .apiKey(secretValue)
                .build();

            return new DefaultUnleash(config);

        } catch (Exception e) {
            logger.error("Error getting secret value from Secret Manager and setting up Unleash: " + e.getMessage());
            return null;
        }
    }
} 