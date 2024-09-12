/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 25-08-2022
Description: Class containing logic for retrieving data from the database
service.
===========================================================================
*/
package com.telus.samples.postgres.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import java.sql.Array;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.telus.samples.model.Item;
import com.telus.samples.postgres.PostgresService;

@Repository
public class ItemServiceDAO {

    private static Logger logger = LoggerFactory.getLogger(ItemServiceDAO.class);
   
   @Autowired
	private PostgresService dbService;
	
    /**
     * Retrieve an item from the database, based on the input id
     * 
     * @param id Item's id
     * @return Item with the given id
     * @throws Exception
     */
	public Item getItemById(int id) throws Exception {
		Item item = null;

        String queryStr = " select * from item where id = ?";
		try(Connection conn = dbService.getConnection();
        PreparedStatement pst = conn.prepareStatement(queryStr)){

            pst.setInt(1,id);

            try(ResultSet rst = pst.executeQuery()){
                List<Item> itemList = parseItemObjects(rst);
                item = itemList.get(0);
            }
		} catch(Exception e) {
			logger.error(e.getMessage(), e);
	        throw new Exception("SQL error");
		}
		
		return item;
	}
	
    /**
     * Retrieve all items from the database satisfying any of the given ids
     * 
     * @param keys List of item ids
     * @return All items whose id is in the input list
     * @throws Exception
     */
	public List<Item> getItems(List<Integer> keys) throws Exception {
		List<Item> itemList = null;

        String queryStr = " select * from item where id = ANY(?)";
		try(Connection conn = dbService.getConnection();
        PreparedStatement pst = conn.prepareStatement(queryStr)){

            Array arr = conn.createArrayOf("integer", keys.toArray());
            pst.setArray(1,arr);

            try(ResultSet rst = pst.executeQuery()){
                    itemList = parseItemObjects(rst);
            }
		} catch(Exception e) {
			logger.error(e.getMessage(), e);
	        throw new Exception("SQL error");
		}
		
		return itemList;
	}
	
    /**
     * Retrieve a filtered list of items from the database, based on the input params
     * 
     * @param limit Max number of items in the returned list
     * @param skip Number of items to skip before beginning to return the result list
     * @param sort_field Field of "item" to sort the items by
     * @param sort_order "asc" or "desc" for ordering the returned items
     * @return Ordered list of items satisfying the filter from the params
     * @throws Exception
     */
	public List<Item> getFilteredItems(int limit , int skip, String sort_field, String sort_order) throws Exception{
		List<Item> itemList = null;
		
        StringBuffer queryStr = new StringBuffer(" select * from item where 1=1  ");
        if(sort_field != null)
            queryStr.append(" order by \"" + sort_field + "\"");
        if(sort_order != null)
            queryStr.append(" " + sort_order);
        if(limit > 0)
            queryStr.append(" limit " + limit);
        if(skip > 0)
            queryStr.append( " offset " + skip);
        logger.debug("Filter Query: " + queryStr.toString());

		try(Connection conn = dbService.getConnection();
        PreparedStatement pst = conn.prepareStatement(queryStr.toString());
        ResultSet rst = pst.executeQuery()){

			itemList = parseItemObjects(rst);

		} catch(Exception e) {
			logger.error(e.getMessage(), e);
	        throw new Exception("SQL error");
		}
		
		return itemList;
	}
	
    /**
     * Retrieve all items for a given order
     * 
     * @param orderId Id of the order whose items should be retrieved
     * @return List of items for the order with the given id
     * @throws Exception
     */
	public List<Item> getOrderItems(int orderId) throws Exception {
		List<Item> itemList = null;

        String queryStr = " select * from order_items where order_id = ?";
		try(Connection conn = dbService.getConnection();
        PreparedStatement pst = conn.prepareStatement(queryStr)){

            pst.setInt(1,orderId);

            try(ResultSet rst = pst.executeQuery()){
                List<Integer> idList = new ArrayList<Integer>();
                while(rst.next()) {
                    idList.add(Integer.valueOf(rst.getInt("item_id")));
                }
                itemList = getItems(idList);
                
            }
		} catch(Exception e) {
			logger.error(e.getMessage(), e);
	        throw new Exception("SQL error");
		}
		
		return itemList;
	}
	
    /**
     * Helper method for parsing database results into item DTOs
     * 
     * @param rs Result set returned from the database
     * @return List of items corresponding to the input result set
     * @throws Exception
     */
	public List<Item> parseItemObjects(ResultSet rs) throws Exception{
		if(rs !=null) {
			List<Item> itemList = new ArrayList<Item>();
			while(rs.next()) {
				Item itemObj = new Item();
				itemObj.setId(rs.getInt("id"));
				itemObj.setName(rs.getString("name"));
				itemObj.setPrice(rs.getFloat("price"));
				
				itemList.add(itemObj);
			}
			return itemList;
		}
		logger.debug("Empty ResultSet for Item Query");
		return null;
	}

}
