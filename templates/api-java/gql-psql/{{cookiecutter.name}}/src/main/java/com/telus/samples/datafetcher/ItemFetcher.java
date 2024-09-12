/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-08-2022
Description: Data fetcher class used by DGS for "item" types in
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
import com.netflix.graphql.dgs.InputArgument;
import com.telus.samples.model.Item;

import com.telus.samples.postgres.dao.ItemServiceDAO;

@DgsComponent   // Mark this class as a datafetcher for DGS
public class ItemFetcher {
	private static final Logger logger = LoggerFactory.getLogger(ItemFetcher.class);

	@Autowired
	ItemServiceDAO itemDataService;
	
    /**
     * Fetch data for a "item" query from the DAO
     * 
     * @param id Item ID of the item to be retrieved
     * @return Item returned by the DAO
     */
	@DgsData(parentType = "Query", field ="item")
	public Item getItemById(@InputArgument int id){
		try {
			Item itemData = itemDataService.getItemById(id);
			return itemData;
		}catch( Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}
	
    /**
     * Fetch data for a "items" query from the DAO
     * 
     * @param limit Max number of items in the returned list
     * @param skip Number of items to skip before beginning to return the result list
     * @param sort_field Field of "item" to sort the items by
     * @param sort_order "asc" or "desc" for ordering the returned items
     * @return Ordered list of items satisfying the filter from the params
     */
	@DgsData(parentType = "Query" , field ="items")
	public List<Item> getFilteredItemList(@InputArgument int limit, @InputArgument int skip , @InputArgument String sort_field, @InputArgument String sort_order){
		try {
			List<Item> itemData = itemDataService.getFilteredItems(limit , skip , sort_field, sort_order);
			return itemData;
		}catch( Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}
    
}
