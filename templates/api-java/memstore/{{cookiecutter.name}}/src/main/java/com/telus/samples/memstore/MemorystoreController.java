/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-03-2022
Description: Sample controller for adding key-value pairs into a Redis
instance on GCP. The location of the instance is defined within
application.properties.
===========================================================================
*/
package com.telus.samples.memstore;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import redis.clients.jedis.Jedis;

@Controller
public class MemorystoreController {

    private static final Logger logger = LoggerFactory.getLogger(MemorystoreController.class);

    private static final String IP_KEY = "example.redis.ip";
    private static final String PORT_KEY = "example.redis.port";

    @Autowired
    private Environment environment;

    @Autowired
    private JedisService jedisService;

    /**
     * Server endpoint for GET /cache (e.g. localhost:8080/cache) that displays the page for creating
     * key-value pairs in memorystore
     * 
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @GetMapping("/cache")
	public String cachePage(Model model) {
        String ip = environment.getProperty(IP_KEY);
        int port = Integer.parseInt(environment.getProperty(PORT_KEY));

        model.addAttribute("redisLoc", ip + ":" + port);
        model.addAttribute("entry", new RedisEntry());
        return "cache"; // Display cache.html template
	}

    /**
     * Server endpoint for POST /cache (e.g. localhost:8080/cache) that saves the user-input key-value
     * pair to the Redis instance, and immediately retrieves the value to display to the page.
     * 
     * @param entry Backing object representing the new key-value pair
     * @param model Model map containing attributes that are mapped to variables in the returned template
     * @return Name of the template to be served
     */
    @PostMapping("/cache")
    public String saveToCache(@ModelAttribute RedisEntry entry, Model model) {
        String ip = environment.getProperty(IP_KEY);
        int port = Integer.parseInt(environment.getProperty(PORT_KEY));

        if (entry.getKey().isEmpty() || entry.getValue().isEmpty()) {
            model.addAttribute("result", "Key and value inputs cannot be empty.");

        } else {
            // Initialize new Jedis connection from pool, try-with-resources for auto-closing
            try (Jedis jedis = jedisService.getConnection();) {

                // Save an entry
                jedis.set(entry.getKey(), entry.getValue());

                // Retrieve an entry's value by its key
                String result = jedis.get(entry.getKey());

                // Show results on UI
                model.addAttribute("result", "Entry saved - Retrieving value with key " + entry.getKey() + ": " + result);

            } catch (Throwable ex) {
                ex.printStackTrace();
                logger.error("Exception caught - " + ex.getMessage(), ex);
                model.addAttribute("result", ex.getMessage());
            }
        }
		
        model.addAttribute("redisLoc", ip + ":" + port);
        model.addAttribute("entry", new RedisEntry());
		return "cache"; // Display cache.html template
    }
}