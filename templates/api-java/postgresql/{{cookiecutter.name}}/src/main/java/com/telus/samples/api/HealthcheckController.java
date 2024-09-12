/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
Kubernetes provides 3 different types of probes to automatically monitor and manage health
of a running container within a pod:
  Liveness Probe: used to check if a container is alive and healthy. 
  Readiness Probe: determines if a container is ready to accept a requests
  Startup Probe: only runs once to determine if the container started and is ready for requests.
===========================================================================
Last updated: 20-02-2023
Description: Sample API controller with startup, readiness, liveness endpoints that return status code 200
===========================================================================
*/

package com.telus.samples.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HealthcheckController {

    @GetMapping("/startup")
    public ResponseEntity<String> getStartup() {
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN)
            .body("" + HttpStatus.OK);
    }

    @GetMapping("/liveness")
    public ResponseEntity<String> getLiveness() {
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN)
            .body("" + HttpStatus.OK);
    }

    @GetMapping("/readiness")
    public ResponseEntity<String> getReadiness() {
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN)
            .body("" + HttpStatus.OK);
    }
}
