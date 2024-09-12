/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 20-08-2024
Description: This method is part of the graphQL template, resolves a value 
for a type or field within a schema.
===========================================================================
*/

/* eslint-disable no-unused-vars */
import {
  getCustomersFromDB,
  getCustomerFromDB,
  getItemsFromDB,
  getItemFromDB,
  getOrdersFromDB,
  getOrderFromDB,
} from '../../services/dbQueryService';

type Context = {
  // Define the context type here
};

type Args = {
  id?: number;
  limit?: number;
  skip?: number;
  sort_field?: string;
  sort_order?: string;
};

const resolvers = {
  Query: {
    customer: async (obj: any, args: Args, context: Context) => {
      return await getCustomerFromDB(args.id!);
    },
    customers: async (obj: any, args: Args, context: Context) => {
      return await getCustomersFromDB(args.limit, args.skip, args.sort_field, args.sort_order);
    },
    order: async (obj: any, args: Args, context: Context) => {
      return await getOrderFromDB(args.id!);
    },
    orders: async (obj: any, args: Args, context: Context) => {
      return await getOrdersFromDB(args.limit, args.skip, args.sort_field, args.sort_order);
    },
    item: async (obj: any, args: Args, context: Context) => {
      return await getItemFromDB(args.id!);
    },
    items: async (obj: any, args: Args, context: Context) => {
      return await getItemsFromDB(args.limit, args.skip, args.sort_field, args.sort_order);
    },
  },
};

export default resolvers;
