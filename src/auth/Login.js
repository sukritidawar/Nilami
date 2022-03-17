import React, { useState, useContext } from 'react';
import axios from "axios";
import { Grid, Box, TextField, Typography, Button, Avatar, Container, Link, Checkbox, Paper, Backdrop } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Store from "../store/Store";
import Keys from "../config";
import { LOGIN } from "../store/Types";
import Cookies from 'js-cookie';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from '../images/Auction1.png'
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const defaultuser = {
  email: "",
  password: ""
}

const Login = () => {
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
    handleLogin();
    setUser({
      email: "",
      password: "",
    });
  };


  const handleLogin = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = Keys.BASE_API + "user/login";
      const body = JSON.stringify(user);

      var res = await axios.post(url, body, config);
      console.log(res);

      if (res.data.success) {
        Cookies.set('isAuth', `${res.data.success}`);
        Cookies.set('user_id', `${res.data.user_id}`);

        console.log(await dispatch({
          type: LOGIN,
          isAuth: `${res.data.success}`,
          user_id: `${res.data.user_id}`,
        }));

        navigate("/feed");
      }
      else {
        alert("wrong credentials");
        navigate("/");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={8}
          md={6}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
            paddingTop: 18,
          }}
        >
          <Typography variant="h1" fontSize="180px" color="rgb(15,76,92)">Niलाmi</Typography>
          <Typography fontSize="36px" color="rgb(231,111,81)">Like it, Try it, Bid it, Buy it. </Typography>

        </Grid>
        <Grid item xs={12} sm={4} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#e9c46a' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                label="Email"
                variant="standard"
                placeholder='Email'
                name="email"
                type="email"
                value={user.email}
                onChange={getUserData}
                fullWidth
                required
                autoFocus />

              <TextField
                margin="normal"
                label="Password"
                variant="standard"
                placeholder='Password'
                name="password"
                type="password"
                value={user.password}
                onChange={getUserData}
                fullWidth
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Sign In
            </Button>

              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"New to Niलाmi? Sign Up."}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider >
  )
}

export default Login