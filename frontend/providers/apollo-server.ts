// lib/apollo-server.ts
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache, registerApolloClient } from "@apollo/client-integration-nextjs";

export const { getClient, query, PreloadQuery } = registerApolloClient( () => {
  return new ApolloClient( {
    cache: new InMemoryCache(),
    link: new HttpLink( {
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      // You can pass standard Next.js fetch options here for caching
      fetchOptions: { cache: 'no-store' }
    } ),
  } );
} );