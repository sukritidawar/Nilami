import React, { useState, useContext } from 'react';
import axios from "axios";
import { Container, Grid, Box, Paper, Button, TextField, Typography } from '@mui/material';
import Store from "../store/Store";
import Keys from "../config";
import { LOGIN } from "../store/Types";
import Cookies from 'js-cookie';
import { makeStyles } from "@material-ui/core/styles";
import {Link,useNavigate} from "react-router-dom";
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

const useStyles = makeStyles((theme) => ({
  page:{
    backgroundColor:"#e6e6e6"
  },
  signup_comp: {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(15),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }
}));
const Signup = () => {

  const navigate = useNavigate();
  const [state, dispatch] = useContext(Store);
  const [user, setUser] = useState(defaultuser);


  let name, value;
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
      Cookies.set('user_id',`${res.data.user_id}`);
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


  const styles = useStyles();
  return (

    <>
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

export default Signup;