import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

export const ApolloContextProvider:React.FC<PropsWithChildren> = ({children}) => {
  
  const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
} 