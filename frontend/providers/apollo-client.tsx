// lib/apollo-client.tsx
"use client";

import { HttpLink } from "@apollo/client";
import { ApolloClient, ApolloNextAppProvider, InMemoryCache, } from "@apollo/client-integration-nextjs";

// This function creates a new client for every new browser session
function makeClient() {
  return new ApolloClient( {
    cache: new InMemoryCache(),
    link: new HttpLink( {
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    } ),
  } );
}

export function ApolloWrapper( { children }: React.PropsWithChildren ) {
  return (
    <ApolloNextAppProvider makeClient={ makeClient }>
      { children }
    </ApolloNextAppProvider>
  );
}