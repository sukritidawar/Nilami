import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Avatar, Button, Container, CssBaseline, Grid, Box, Link, TextField, Typography } from '@mui/material';
import Store from '../../store/Store';
import Keys from '../../config';
import { LOGIN } from '../../store/Types';
import Cookies from 'js-cookie';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const defaultuser = {
  name: '',
  email: '',
  password: '',
  primary_number: '',
  address: '',
  city: '',
  pincode: '',
  mobile: '',
  profile_url: '',
};

const Signup = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Store);
  const [user, setUser] = useState(defaultuser);
  let name, value;

  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    postData(user);
    setUser({
      name: '',
      email: '',
      password: '',
      primary_number: '',
      address: '',
      city: '',
      pincode: '',
      mobile: '',
      profile_url: '',
    });
  };

  // Register the new user in the databse.
  const postData = async (newUser) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const url = Keys.BASE_API + 'user/signup';
      const body = JSON.stringify(newUser);

      var res = await axios.post(url, body, config);
      console.log(res);

      if (res.data.success) {
        Cookies.set('user_id', `${res.data.user_id}`);
        Cookies.set('user_name', `${res.data.user_name}`);

        await dispatch({
          type: LOGIN,
          user_id: `${res.data.user_id}`,
          user_name: `${res.data.user_name}`,
        });

        navigate('/feed');
      } else {
        alert('wrong credentials');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/sukritidawar/Nilami">
          Niलाmi
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

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
          <Typography variant="h2" color="#002E6E">
            Niलाmi
          </Typography>
          <Typography variant="h5" color="#1976d2"><i>
            Like it, Bid for it, Buy it.
            </i></Typography>

          <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={getUserData}
                  fullWidth
                  required
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  placeholder="Phone"
                  name="primary_number"
                  type="text"
                  value={user.primary_number}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Profile picture url"
                  variant="outlined"
                  placeholder="Profile url"
                  name="profile_url"
                  type="text"
                  value={user.profile_url}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  placeholder="Address"
                  name="address"
                  type="text"
                  value={user.address}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  placeholder="City"
                  name="city"
                  type="text"
                  value={user.city}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Pincode"
                  variant="outlined"
                  placeholder="Pincode"
                  name="pincode"
                  type="number"
                  value={user.pincode}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Mobile"
                  variant="outlined"
                  placeholder="Mobile Number"
                  name="mobile"
                  type="text"
                  value={user.mobile}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
                alignSelf='center'
                style={{ marginLeft: '14px' }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
