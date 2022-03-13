import React, { useState, useContext } from 'react';
import axios from "axios";
import { Avatar, Button, Container, CssBaseline, Link, Grid, Box, Paper, TextField, Typography } from '@mui/material';
import Store from "../store/Store";
import Keys from "../config";
import { LOGIN } from "../store/Types";
import Cookies from 'js-cookie';
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link, useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;



const defaultuser = {
  name: "",
  email: "",
  password: "",
  primary_number: "",
  address: "",
  city: "",
  pincode: "",
  mobile: "",
}

const Signup = () => {

  const theme = createTheme();

  const navigate = useNavigate();
  const [state, dispatch] = useContext(Store);
  const [user, setUser] = useState(defaultuser);
  let name, value;

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Niलाmi
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    postData(user);
    setUser({
      name: "",
      email: "",
      password: "",
      primary_number: "",
      address: "",
      city: "",
      pincode: "",
      mobile: "",
    });
  };

  const postData = async (newUser) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = Keys.BASE_API + "user/signup";
      const body = JSON.stringify(newUser);

      var res = await axios.post(url, body, config);
      console.log(res);
      Cookies.set('user_id', `${res.data.user_id}`);
      // console.log(state);
      console.log(await dispatch({
        type: LOGIN,
        user_id: `${res.data.user_id}`,

      }));

      console.log(state);
      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h2' color="rgb(15,76,92)">Niलाmi</Typography>
          <Typography variant="h4" color="rgb(231,111,81)">Lid it, Try it, Bid it, Buy it.</Typography>

          <Avatar sx={{ m: 1, bgcolor: 'rgb(233,196,106)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  placeholder='Name'
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
                  placeholder='Email'
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
                  placeholder='Phone'
                  name="primary_number"
                  type="text"
                  value={user.primary_number}
                  onChange={getUserData}
                  fullWidth
                  required />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Profile url"
                  variant="outlined"
                  placeholder='Profile url'
                  name="profile_url"
                  type="password"
                  value={user.profile_url}
                  onChange={getUserData}
                  fullWidth
                  required />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="address"
                  variant="outlined"
                  placeholder='address'
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
                  label="city"
                  variant="outlined"
                  placeholder='city'
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
                  placeholder='Pincode'
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
                  placeholder='Mobile'
                  name="mobile"
                  type="number"
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
                  placeholder='Password'
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
                color="primary"
                type="submit" onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
                fullWidth>
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
  )
};

export default Signup;

/*
    <div className={styles.page}>
      <Typography variant='h2'>Niलाmi</Typography>
      <Typography variant="h4">Welcome, ek line achi si lini hai</Typography>
      <Container className={styles.signup_comp}>
        <Paper component={Box} width="60%" mx="auto" p={4} boxShadow={10}>
          <form onSubmit={handleSubmit} method="POST">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  placeholder='Name'
                  name="name"
                  type="text"
                  value={user.name}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  placeholder='Email'
                  name="email"
                  type="email"
                  value={user.email}
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
                  placeholder='Password'
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  placeholder='Phone'
                  name="primary_number"
                  type="number"
                  value={user.primary_number}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Profile url"
                  variant="outlined"
                  placeholder='Profile url'
                  name="profile_url"
                  type="password"
                  value={user.profile_url}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="address"
                  variant="outlined"
                  placeholder='address'
                  name="address"
                  type="text"
                  value={user.address}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="city"
                  variant="outlined"
                  placeholder='city'
                  name="city"
                  type="text"
                  value={user.city}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Pincode"
                  variant="outlined"
                  placeholder='Pincode'
                  name="pincode"
                  type="number"
                  value={user.pincode}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Mobile"
                  variant="outlined"
                  placeholder='Mobile'
                  name="mobile"
                  type="number"
                  value={user.mobile}
                  onChange={getUserData}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit" onClick={handleSubmit}
                  mt={1}
                  fullWidth>
                  Submit
              </Button>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant='body1'>Already on Nilami <Button
                  variant="text"
                  color="primary"
                  component={Link} to="/"

                  mt={1}>
                  Signin
              </Button></Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  </>
);
};
*/