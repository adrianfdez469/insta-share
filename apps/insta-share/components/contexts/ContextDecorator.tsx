import { PropsWithChildren } from "react";
import { AuthProvider } from './authContext'
import { ApolloContextProvider } from "./apolloContextProvider";
import { MiuThemeContextProvider } from "./muiThemeContextProvider";

// This component is going to have all Providers of the APP
export const AppContextProvider:React.FC<PropsWithChildren> = ({children}) => {
  
  return (
    <ApolloContextProvider>
      <MiuThemeContextProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </MiuThemeContextProvider>
    </ApolloContextProvider>
  )
}