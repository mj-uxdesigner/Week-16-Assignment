//Icons
import { MdLockOutline } from 'react-icons/md';
import { theme } from '../Theme/theme';

import { useState } from 'react';
import { auth } from '../firebaseConfig';

import {
    Avatar,
    Button,
    CssBaseline, 
    TextField,
    Link,
    Grid,
    Box,
    Typography, 
    Container, 
    ThemeProvider 
} from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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



export default function SignUp() {

    const navigate = useNavigate()

    const [ emailError, setEmailError ] = useState(false)
    const [ passwordError, setPasswordError ] = useState(false)
    const [ firstNameError, setFirstNameError ] = useState(false)
    const [ lastNameError, setLastNameError ] = useState(false)

    const [ registerEmail, setRegisterEmail ] = useState('')
    const [ registerPassword, setRegisterPassword ] = useState('')
    const [ registerFirst, setRegisterFirst ] = useState('')
    const [ registerLast, setRegisterLast ] = useState('')
   
    const register = async (event) => {
        event.preventDefault()
        
        setFirstNameError(false)
        setLastNameError(false)
        setEmailError(false)
        setPasswordError(false)

        if (firstNameError == ''){setFirstNameError(true)};
        if (lastNameError == ''){setLastNameError(true)};
        if (emailError == ''){setEmailError(true)};
        if (passwordError == ''){setPasswordError(true)};
        
        if(registerEmail && registerPassword && registerFirst && registerLast){
            try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            navigate('/yourjokes')
        } catch (error) {
            window.flash(error.message)
        }
            
        };
   
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box component="form" autoComplete='off' noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    onChange={(event) => {setRegisterFirst(event.target.value)}}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={firstNameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    onChange={(event) => {setRegisterLast(event.target.value)}}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={lastNameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    onChange={(event) => {setRegisterEmail(event.target.value)}}
                    required
                    fullWidth
                    type='email'
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    onChange={(event) => {setRegisterPassword(event.target.value)}}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={passwordError}
                />
              </Grid>
            </Grid>
            <Button 
                onClick={register}
                type='submit'
                fullWidth
                color='primary'
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href='/signin' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}