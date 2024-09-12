/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-08-2022
Description: Data fetcher class used by DGS for "order" types in
GraphQL. This operates on the server-side of GraphQL.
===========================================================================
*/
package com.telus.samples.datafetcher;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsData;
import com.netflix.graphql.dgs.DgsDataFetchingEnvironment;
import com.netflix.graphql.dgs.InputArgument;
import com.telus.samples.model.Customer;
import com.telus.samples.model.Item;
import com.telus.samples.model.Order;
import com.telus.samples.postgres.dao.CustomerServiceDAO;
import com.telus.samples.postgres.dao.ItemServiceDAO;
import com.telus.samples.postgres.dao.OrderServiceDAO;

@DgsComponent   // Mark this class as a datafetcher for DGS
public class OrderFetcher {

	private static final Logger logger = LoggerFactory.getLogger(OrderFetcher.class);
	
	@Autowired
	ItemServiceDAO itemDataService;

	@Autowired
	OrderServiceDAO orderDataService;

	@Autowired
	CustomerServiceDAO customerService;
	
    /**
     * Fetch data for a "order" query from the DAO
     * 
     * @param id Order ID of the order to be retrieved
     * @return Order returned by the DAO
     */
	@DgsData(parentType = "Query", field = "order")
	public Order getOrderById(@InputArgument int id) {
		try {
			return orderDataService.getOrderById(id);
		}catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
		
	}
	
    /**
     * Fetch data for a "orders" query from the DAO
     * 
     * @param limit Max number of orders in the returned list
     * @param skip Number of orders to skip before beginning to return the result list
     * @param sort_field Field of "order" to sort the orders by
     * @param sort_order "asc" or "desc" for ordering the returned orders
     * @return Ordered list of orders satisfying the filter from the params
     */
	@DgsData(parentType="Query", field="orders")
	public List<Order> getFilteredOrders(@InputArgument int limit, @InputArgument int skip , @InputArgument String sort_field, @InputArgument String sort_order){
		try {
			List<Order> orderData = orderDataService.getFilteredOrders(limit , skip , sort_field, sort_order);
			return orderData;
		}catch( Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}
	
    /**
     * Fetch "customer" data which will be returned as part of an "order" query
     * 
     * @param dfe Context data for fetching
     * @return Customer associated with the order
     */
	@DgsData(parentType = "order", field = "customer")
	public Customer getCustomer(DgsDataFetchingEnvironment dfe){
		Order orderObj = dfe.getSource();
		
		try {
			return customerService.getCustomerById(orderObj.getCustomerId());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}
	
    /**
     * Fetch "item" data for a list of items which will be returned as part of an "order" query
     * 
     * @param dfe Context data for fetching
     * @return Items associated with the order
     */
	@DgsData(parentType = "order", field = "items")
	public List<Item> getOrderItems(DgsDataFetchingEnvironment dfe){
		Order orderObj = dfe.getSource();
		
		try {
			return itemDataService.getOrderItems(orderObj.getId());
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}
    
}
