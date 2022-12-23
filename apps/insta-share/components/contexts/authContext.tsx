import { ApolloError, gql, useMutation } from '@apollo/client';
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';


interface IAuthContext {
  state?: IState,
  loading: boolean,
  error?: ApolloError
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuth: boolean
}
const AuthContext = createContext<IAuthContext>(null);

interface IState {
  id: string
  email: string
  token: string 
  exp: number
}
const initialState: IState = null;

const LOGIN_USER_MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      code
      success
      message
      data {
        id
        email
        token
        exp
      }
    }
  }
`
 
const AuthProvider:FC<PropsWithChildren> = ({children}) => {
  
  const { setStorageData, getStorageData, deleteStorageData } = useLocalStorage()
  const [state, setState] = useState<IState>(initialState);
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER_MUTATION)
  const [isAuth, setIsAuth] = useState(false);
  
  const login = async (email: string, password: string) => {
    const data = await loginUser({variables: { email, password }});
console.log(data);

    if(data.data.loginUser.success) {
      const userAuthData = data.data.loginUser.data;
      // Change context value
      setState(userAuthData);
      setIsAuth(true);
      // Change local storage value
      setStorageData(userAuthData);
      return true;
    } else {
      return false;
    }
    
  }

  const logout = () => {
    setState(null);
    setIsAuth(false);
    deleteStorageData();
  };  

  const initializeAuthState = () => {
    // get user info from ls
    const data = getStorageData();
    if(data) {
      setState({
        email: (data as IState).email,
        id: (data as IState).id,
        exp: (data as IState).exp,
        token: (data as IState).token
      })
      setIsAuth(true);
    }
  }

  useEffect(() => {
    console.log('initializeAuthState');
    initializeAuthState()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        loading,
        error,
        login,
        logout,
        isAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export {
  AuthProvider,
  AuthContext
}