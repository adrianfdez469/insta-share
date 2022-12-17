import { useRouter } from "next/router";
import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/authContext"

const useAuthGuard = () => {
  
  const { isAuth } = useContext(AuthContext);
  const router = useRouter()
  
  useEffect(() => {
    if(isAuth && router.asPath !== '/app') {
      router.replace('/app');
    } else if (!isAuth && router.asPath === '/app') {
      router.replace('/signin');
    }
  }, [isAuth, router])

  return {}
}

export { useAuthGuard }