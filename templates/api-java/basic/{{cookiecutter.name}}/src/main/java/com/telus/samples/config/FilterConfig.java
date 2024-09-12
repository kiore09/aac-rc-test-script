/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 28-11-2022
Description: Sample configuration class - adds filters to endpoints
matching any of the given URL path patterns
===========================================================================
*/
package com.telus.samples.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.telus.samples.filter.DemoFilter;

@Configuration
public class FilterConfig implements WebMvcConfigurer {

    /**
     * Adds the DemoFilter for the "/users" and "/user/*" endpoints
     */
    @Bean
    public FilterRegistrationBean<DemoFilter> demoFilter() {
        FilterRegistrationBean<DemoFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new DemoFilter());
        registrationBean.addUrlPatterns("/users", "/user/*", "/birthday");   // Patterns to match
        return registrationBean;
    }
}
