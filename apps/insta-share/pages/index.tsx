import Image from 'next/image';
import { Box, Button, Container, Typography } from '@mui/material';

import styles from './index.module.css';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../components/contexts/authContext';
import { useRouter } from 'next/router';



export function Index() {

  const { isAuth, state } = useContext(AuthContext);
  const router = useRouter()


  const onContinueClick = () => {
    if(isAuth){
      router.push('/app');
    } else {
      router.push('/signin');
    }
  }

  return (
    <Container className={styles['container']}>
      <Typography variant='h2'>
        {`Hello there,`}
      </Typography>
      <Typography variant='body1'>{isAuth ? state.email : ''}</Typography>
      <Typography variant='h4'>
        Welcome to insta-share 👋
      </Typography>
      
      <Button variant='contained' onClick={onContinueClick}>
        {isAuth ? 'Continuar': 'Signin'}
      </Button>
    </Container>
        
  );
}

export default Index;
