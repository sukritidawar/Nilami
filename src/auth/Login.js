import React, { useState, useContext } from 'react';
import axios from "axios";
import { Grid, Box, TextField, Typography, Button, Container, Paper } from '@mui/material';
import Store from "../store/Store";
import Keys from "../config";
import { LOGIN } from "../store/Types";
import Cookies from 'js-cookie';
import { makeStyles } from "@material-ui/core/styles";
import {Link,useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;

const defaultuser = {
  email: "",
  password: ""
}

const useStyles = makeStyles((theme) => ({
  login_comp: {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(15),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  }
}));


const Login = () => {
  const navigate = useNavigate();
  const styles = useStyles();

  const [state, dispatch] = useContext(Store);
  const [user, setUser] = useState(defaultuser);
  let name, value;

  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value })
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

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.login_comp}>
      <Typography variant="h1" >Niलाmi</Typography>
      <Typography>Lid it, Try it, Bid it, Buy it. </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Container>
            <Paper component={Box} width="60%" mx="auto" p={4} boxShadow={10}>

              <form onSubmit={handleLogin} >
                <TextField
                  label="Email"
                  variant="standard"
                  placeholder='Email'
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={getUserData}
                  fullWidth
                  required />

                <TextField
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

                <Typography><Button variant='contained' onClick = {handleLogin}>SIGNIN</Button> New to Nilami <Button variant='text' component={Link} to= "/signup">SIGNUp</Button></Typography>
              </form>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>

          <img srcSet={require(`../images/Auction.jpg`)}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Login