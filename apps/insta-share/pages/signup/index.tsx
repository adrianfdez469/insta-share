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
import useCreateUser from '../../components/hooks/useCreateUser';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router'
import { useAuthGuard } from '../../components/hooks/useAuthGuard';

export function Signup() {
  
  const router = useRouter()
  // TODO: handle error
  const { createUser, loading, error } = useCreateUser();
  useAuthGuard();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email') as string;
    const password = data.get('password') as string;
    
    await createUser(email, password);
    router.push('/signin');
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
             <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Box sx={{ position: 'relative' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <div style={{display: 'flex', flexDirection: 'row', padding: '4px'}}>
                Sign Up
                { loading && (
                  <CircularProgress
                    size={24}
                    color={'inherit'}
                    sx={{
                      marginLeft: '16px'
                    }}
                  />
                )}
              </div>
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NextLink href="signin">
                {"Already have an account? Sign in"}
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
