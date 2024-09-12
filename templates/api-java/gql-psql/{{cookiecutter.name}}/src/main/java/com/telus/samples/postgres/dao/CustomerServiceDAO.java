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
import com.telus.samples.model.Customer;
import com.telus.samples.postgres.PostgresService;

@Repository
public class CustomerServiceDAO {
	
	private static final Logger logger = LoggerFactory.getLogger(CustomerServiceDAO.class);

	@Autowired
	private PostgresService dbService;
	
	/**
     * Retrieve all customers from the database
     * 
     * @return All customers in the database as a list
     * @throws Exception
     */
	public List<Customer> getAllCustomers() throws Exception {
		List<Customer> customerList = new ArrayList<Customer>();
	
		String queryStr = " select * from customer";
		try(Connection conn = dbService.getConnection();
        PreparedStatement pst = conn.prepareStatement(queryStr);
		ResultSet rst = pst.executeQuery()){
            
            customerList = parseCustomerObjects(rst);

		} catch(Exception e) {
            logger.error(e.getMessage(), e);
	        throw new Exception("SQL error");
		}
		
		return customerList;
	}
	
    /**
     * Retrieve a customer from the database, based on the input id
     * 
     * @param id Customer's id
     * @return Customer with the given id
     * @throws Exception
     */
	public Customer getCustomerById(int id) throws Exception {
		Customer customerList = null;
		
        String queryStr = " select * from customer where id = ?";
		try(Connection conn = dbService.getConnection();
        PreparedStatement pst = conn.prepareStatement(queryStr)){

            pst.setInt(1,id);

            try(ResultSet rst = pst.executeQuery()){
                customerList = parseCustomerObjects(rst).get(0);
            }
		} catch(Exception e) {
			logger.error(e.getMessage(), e);
	        throw new Exception("SQL error");
		}
		
		return customerList;
	}
	
    /**
     * Retrieve a filtered list of customers from the database, based on the input params
     * 
     * @param limit Max number of customers in the returned list
     * @param skip Number of customers to skip before beginning to return the result list
     * @param sort_field Field of "customer" to sort the customers by
     * @param sort_order "asc" or "desc" for ordering the returned customers
     * @return Ordered list of customers satisfying the filter from the params
     * @throws Exception
     */
	public List<Customer> getFilteredCustomers(int limit , int skip, String sort_field, String sort_order) throws Exception {
		List<Customer> customerList = null;
		
		StringBuffer queryStr = new StringBuffer(" select * from customer where 1=1  ");
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
			
            customerList = parseCustomerObjects(rst);

		} catch(Exception e) {
			logger.error(e.getMessage(), e);
	        throw new Exception("SQL error");
		}
		
		return customerList;
	}
	
    /**
     * Helper method for parsing database results into customer DTOs
     * 
     * @param rs Result set returned from the database
     * @return List of customers corresponding to the input result set
     * @throws Exception
     */
	public List<Customer> parseCustomerObjects(ResultSet rs) throws Exception {
		if(rs !=null) {
			List<Customer> customerList = new ArrayList<Customer>();
			while(rs.next()) {
				Customer custObj = new Customer();
				custObj.setId(rs.getInt("id"));
				custObj.setFirstName(rs.getString("firstname"));
				custObj.setLastName(rs.getString("lastname"));
				custObj.setBirthDate(rs.getDate("birthdate").toString());
				customerList.add(custObj);
			}
			return customerList;
		}
		logger.debug("Empty ResultSet for Customer Query");
		return null;
	}

}
