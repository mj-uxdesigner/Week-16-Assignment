//Icons
import { MdLockOutline } from 'react-icons/md'

import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { theme } from '../Theme/theme';

import { 
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    ThemeProvider 
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        DADjokes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {

    const navigate = useNavigate()

    const [ emailError, setEmailError ] = useState(false)
    const [ passwordError, setPasswordError ] = useState(false)

    const [ loginEmail, setLoginEmail ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')

    
    const login = async (event) => {
        event.preventDefault()
        setEmailError(false)
        setPasswordError(false)

        if(loginEmail == ''){setEmailError(true)}
        if(loginPassword == ''){setPasswordError(true)}

        if(loginEmail && loginPassword){
            try {
                const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
                navigate('/yourjokes')
            } catch (error) {
                console.log(error.message)
            }
        }
    };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'lightgrey' }}>
            <MdLockOutline />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={()=>navigate('/')}  sx={{ mt: 1 }}>
            <TextField
                onChange={(event) => {setLoginEmail(event.target.value)}}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name='email'
                autoComplete="email"
                autoFocus
                error={emailError}
            />
            <TextField
                onChange={(event) => {setLoginPassword(event.target.value)}}
                margin="normal"
                required
                fullWidth
                type='password'
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                error={passwordError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
                onClick={login}
                type='submit'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}