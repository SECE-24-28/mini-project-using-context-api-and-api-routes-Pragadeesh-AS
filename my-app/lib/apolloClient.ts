import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Points to our Next.js API route
const httpLink = new HttpLink({ uri: "/api/graphql" });

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
