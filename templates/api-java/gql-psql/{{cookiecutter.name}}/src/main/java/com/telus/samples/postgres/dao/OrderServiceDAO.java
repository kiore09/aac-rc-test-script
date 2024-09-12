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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.telus.samples.model.Order;
import com.telus.samples.postgres.PostgresService;

@Repository
public class OrderServiceDAO {

    private static Logger logger = LoggerFactory.getLogger(OrderServiceDAO.class);
    
    @Autowired
    private PostgresService dbService;

    /**
     * Retrieve an order from the database, based on the input id
     * 
     * @param id Order's id
     * @return Order with the given id
     * @throws Exception
     */
    public Order getOrderById(int id) throws Exception{
        Order order = null;
        
        String queryStr = " select * from \"order\" where \"Id\" = ?";
        try(Connection conn = dbService.getConnection();
        PreparedStatement pst = conn.prepareStatement(queryStr)){

            pst.setInt(1,id);

            try(ResultSet rst = pst.executeQuery()){
                List<Order> orderList = parseOrderObjects(rst);
                order = orderList.get(0);
            }
        } catch(Exception e) {
            logger.error(e.getMessage(), e);
            throw new Exception("SQL error");
        }
        
        return order;
    }
    
    /**
     * Retrieve a filtered list of orders from the database, based on the input params
     * 
     * @param limit Max number of orders in the returned list
     * @param skip Number of orders to skip before beginning to return the result list
     * @param sort_field Field of "order" to sort the orders by
     * @param sort_order "asc" or "desc" for ordering the returned orders
     * @return Ordered list of orders satisfying the filter from the params
     * @throws Exception
     */
    public List<Order> getFilteredOrders(int limit, int skip, String sort_field, String sort_order)
            throws Exception {
        List<Order> orderList = null;

        StringBuffer queryStr = new StringBuffer(" select * from \"order\" where 1=1  ");
        if (sort_field != null)
            queryStr.append(" order by \"" + sort_field + "\"");
        if (sort_order != null)
            queryStr.append(" " + sort_order);
        if (limit > 0)
            queryStr.append(" limit " + limit);
        if (skip > 0)
            queryStr.append(" offset " + skip);
        logger.debug("Filter Query: " + queryStr.toString());

        try (Connection conn = dbService.getConnection();
        PreparedStatement pst = conn.prepareStatement(queryStr.toString());
        ResultSet rst = pst.executeQuery()) {

            orderList = parseOrderObjects(rst);

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new Exception("SQL error");
        }

        return orderList;
    }
    
    /**
     * Helper method for parsing database results into item DTOs
     * 
     * @param rs Result set returned from the database
     * @return List of orders corresponding to the input result set
     * @throws Exception
     */
    public List<Order> parseOrderObjects(ResultSet rs) throws Exception{
        if(rs !=null) {
            List<Order> orderList = new ArrayList<Order>();
            while(rs.next()) {
                Order orderObj = new Order();
                orderObj.setId(rs.getInt("id"));
                orderObj.setCreatedTime(rs.getString("createdTime"));
                orderObj.setCustomerId(rs.getInt("customer_id"));					
                orderList.add(orderObj);
            }
            return orderList;
        }
        logger.debug("Empty ResultSet for Item Query");
        return null;
    }
}
