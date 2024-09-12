# **GraphQL**

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools. 

You can find additional details about GraphQL [here](https://graphql.org/)

# **Benefits**

- **Get exactly what is requested**. Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Apps using GraphQL are fast and stable because they control the data they get, not the server.
- **Get many resources in a single request**. GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections.
- **Type system**. GraphQL APIs are organized in terms of types and fields, not endpoints. Access the full capabilities of your data from a single endpoint. GraphQL uses types to ensure Apps only ask for what’s possible and provide clear and helpful errors. Apps can use types to avoid writing manual parsing code.
- **Powerful developer tools supported**. Know exactly what data you can request from your API without leaving your editor, highlight potential issues before sending a query, and take advantage of improved code intelligence. GraphQL makes it easy to build powerful tools like GraphiQL by leveraging your API’s type system.
- **Evolve your APIs without versions**. Add new fields and types to your GraphQL API without impacting existing queries. Aging fields can be deprecated and hidden from tools. By using a single evolving version, GraphQL APIs give apps continuous access to new features and encourage cleaner, more maintainable server code.
- **Highly customizable**. GraphQL creates a uniform API across your entire application without being limited by a specific storage engine. Write GraphQL APIs that leverage your existing data and code with GraphQL engines available in many languages. You provide functions for each field in the type system, and GraphQL calls them with optimal concurrency.

# **Service and Cloud SQL**

The GraphQL features includes one GKE workload service and a configured Cloud SQL(PostgreSQL) database. 

**GraphQL Server Server**

- This service will access the PostgreSQL in Cloud SQL in a GCP project.

**GraphiQL Interface**

- This service provides GraphiQL web interface to type in queries, displays the queries and results both sent to/returned from database.
- Click [here](graphiql.PNG) to see an example of GraphiQL interface. 

**GraphQL Simple Web Interface**

- This service will provides an simple API endpoint for querying the list of existing tables in the PostgreSQL database in Cloud SQL. 
- A simple index page is included for showing the results when involing the service's QRY API. 
