import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client';
import { PropsWithChildren } from 'react';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

export const ApolloContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(
          createClient({
            url: process.env.NEXT_PUBLIC_GRAPHQL_SUBSCRIPTION_ENDPOINT,
                             
          })
        )
      : null;

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  });

  const splitLink =
    typeof window !== 'undefined' && wsLink != null
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;

  const apolloClient = new ApolloClient({
    //uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
