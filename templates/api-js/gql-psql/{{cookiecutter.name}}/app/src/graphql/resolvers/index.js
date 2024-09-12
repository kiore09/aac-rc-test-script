/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 27-12-2022
Description: This method is part of the graphQL template, resolves a value 
for a type or field within a schema.
===========================================================================
*/

/* eslint-disable no-unused-vars */
const {
  getCustomersFromDB,
  getCustomerFromDB,
  getItemsFromDB,
  getItemFromDB,
  getOrdersFromDB,
  getOrderFromDB,
  initializePool,
} = require('../../services/dbQueryService');

const resolvers = {
  Query: {
    customer: async (obj, args, context) => {
      return await getCustomerFromDB(args.id);
    },
    customers: async (obj, args, context) => {
      return await getCustomersFromDB(args.limit, args.skip, args.sort_field, args.sort_order);
    },
    order: async (obj, args, context) => {
      return await getOrderFromDB(args.id);
    },
    orders: async (obj, args, context) => {
      return await getOrdersFromDB(args.limit, args.skip, args.sort_field, args.sort_order);
    },
    item: async (obj, args, context) => {
      return await getItemFromDB(args.id);
    },
    items: async (obj, args, context) => {
      return await getItemsFromDB(args.limit, args.skip, args.sort_field, args.sort_order);
    },
  },
};
module.exports = resolvers;
