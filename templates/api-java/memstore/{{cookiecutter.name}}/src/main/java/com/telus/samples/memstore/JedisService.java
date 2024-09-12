/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 24-03-2023
Description: Sample service that configures/manages this application's
connection pool to Redis. The app can get a connection from the pool by
calling getConnection().
===========================================================================
*/
package com.telus.samples.memstore;

import java.time.Duration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

@Service
public class JedisService {

    private static final Logger logger = LoggerFactory.getLogger(JedisService.class);

    private final String redisIp;
    private final int redisPort;

    private final JedisPool jedisPool;

    /**
     * Initializes the Redis client that will interact with a Redis instance
     * specified by the input IP and port.
     * 
     * @param redisIp IP of the target Redis instance
     * @param redisPort Port of the target Redis instance
     */
    @Autowired
    public JedisService (
        @Value("${example.redis.ip}") String redisIp,
        @Value("${example.redis.port}") String redisPort) {

        this.redisIp = redisIp;
        this.redisPort = Integer.parseInt(redisPort);

        // Example Jedis configuration, add more configs or remove/tune these to your application's needs
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMinIdle(2);
        poolConfig.setMaxIdle(8);
        poolConfig.setMaxTotal(16);

        poolConfig.setBlockWhenExhausted(true);
        poolConfig.setMaxWait(Duration.ofSeconds(5));

        poolConfig.setMinEvictableIdleTime(Duration.ofSeconds(50));
        poolConfig.setTimeBetweenEvictionRuns(Duration.ofSeconds(30));

        // Create pool from config
        logger.info("Creating connection pool for Redis client");
        jedisPool = new JedisPool(poolConfig, this.redisIp, this.redisPort);
    }

    /**
     * Get a connection to the Redis instance from the pool
     * 
     * @return Connection resource to the Redis instance
     */
    public Jedis getConnection() {
        return jedisPool.getResource();
    }

    /**
     * Get the IP of the Redis instance
     * 
     * @return Redis instance IP address as a String
     */
    public String getRedisHost() {
        return this.redisIp;
    }

    /**
     * Get the port of the Redis instance
     * 
     * @return Redis instance port as an int
     */
    public int getRedisPort() {
        return this.redisPort;
    }
}