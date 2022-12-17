import { Button } from '@mui/material';
import { AuthContext } from '../../components/contexts/authContext';
import { useContext } from 'react';
import { useAuthGuard } from '../../components/hooks/useAuthGuard'

const AppPage:React.FC = () => {

  useAuthGuard()
  const {logout} = useContext(AuthContext)

 
  return (
    <>
      Welcome 
      <Button variant='contained' onClick={logout}>Cerrar sesion</Button>
    </>
  );
}

export default AppPage;