
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NextLink from '../../components/ui/nextLink';
import { useContext, useState } from 'react';
import { AuthContext } from '../../components/contexts/authContext';
import { useAuthGuard } from '../../components/hooks/useAuthGuard';


export function SignIn() {

  const { login } = useContext(AuthContext);
  const [error, setError] = useState<string>();
  useAuthGuard();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const pass = data.get('password') as string;
    const success = await login(email, pass)
    if(!success){
      setError('Wrong credentials!')
    } else {
      setError(undefined);
    }
  };
  
  return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!error}
                helperText={error ? error : ''}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <NextLink href="/signup">
                      {"Don't have an account? Sign Up"}
                  </NextLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
  );
}

export default SignIn;
