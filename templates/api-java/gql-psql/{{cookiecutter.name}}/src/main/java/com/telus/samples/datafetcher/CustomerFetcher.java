/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-08-2022
Description: Data fetcher class used by DGS for "customer" types in
GraphQL. This operates on the server-side of GraphQL.
===========================================================================
*/
package com.telus.samples.datafetcher;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsData;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import com.telus.samples.model.Customer;
import com.telus.samples.postgres.dao.CustomerServiceDAO;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

@DgsComponent   // Mark this class as a datafetcher for DGS
public class CustomerFetcher {
	private static final Logger logger = LoggerFactory.getLogger(CustomerFetcher.class);

	@Autowired
	CustomerServiceDAO customerDataService;
	
    /**
     * Fetch data for a "customerList" query from the DAO.
     * 
     * @return List of customers returned by the DAO 
     */
	@DgsQuery
	public List<Customer> customerList(){
		try {
			List<Customer> customerData = customerDataService.getAllCustomers();
			return customerData;
		}catch(Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}
	
    /**
     * Fetch data for a "customer" query from the DAO
     * 
     * @param id Customer ID of the customer to be retrieved
     * @return Customer returned by the DAO
     */
	@DgsData(parentType = "Query", field ="customer")
	public Customer getCustomerById(@InputArgument int id){
		try {
			Customer customerData = customerDataService.getCustomerById(id);
			return customerData;
		}catch(Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}
	
    /**
     * Fetch data for a "customers" query from the DAO
     * 
     * @param limit Max number of customers in the returned list
     * @param skip Number of customers to skip before beginning to return the result list
     * @param sort_field Field of "customer" to sort the customers by
     * @param sort_order "asc" or "desc" for ordering the returned customers
     * @return Ordered list of customers satisfying the filter from the params
     */
	@DgsData(parentType = "Query" , field ="customers")
	public List<Customer> getFilteredCustomerList(@InputArgument int limit, @InputArgument int skip , @InputArgument String sort_field, @InputArgument String sort_order){
		try {
			List<Customer> customerData = customerDataService.getFilteredCustomers(limit , skip , sort_field, sort_order);
			return customerData;
		}catch( Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

}
