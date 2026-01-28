import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.WORDPRESS_GRAPHQL_URL, // from env
  cache: new InMemoryCache(),
});

export default client;
