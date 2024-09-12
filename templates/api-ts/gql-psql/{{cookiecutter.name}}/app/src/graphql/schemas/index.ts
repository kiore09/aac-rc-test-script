/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 20-08-2024
Description: This method is part of the graphQL template, schema types are defined here.
===========================================================================
*/

const typeDefs = `
    type customer{
        id: Int
        firstName: String
        lastName: String
        birthDate: String
    }

    type item{
        id: Int
        name: String
        price: Float
    }

    type order{
        id: Int
        createdTime: String
        customer_id: Int 
    }
    type orderitem{
        id: Int
        order_id: Int
        item_id: Int 
    }

    type Query {
    customer( id: Int): customer
    customers(limit: Int, skip: Int, sort_field: String, sort_order: String): [customer]
    item(id: Int ): item
    items(limit: Int, skip: Int, sort_field: String, sort_order: String): [item]
    order(id: Int): order
    orders(limit: Int, skip: Int, sort_field: String, sort_order: String): [order]
    orderitem(id: Int): orderitem
    orderitems(limit: Int, skip: Int, sort_field: String, sort_order: String): [orderitem]
    }
`;
export default typeDefs;
