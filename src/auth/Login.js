import React from 'react'
import { Grid, Box, TextField, Typography, Button, Container, Paper } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

const user = {
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
  const styles = useStyles();

  const handleLogin = () => {

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
                  id="standard-basic"
                  label="Username"
                  variant="standard"
                  margin="normal"
                  // required value={email}
                  fullWidth />
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  type="password"
                  margin="normal"
                  fullWidth
                  required
                // value={password}
                />
                
                <Typography><Button variant='contained'>SIGNIN</Button> New to Nilami <Button variant='text'>SIGNUp</Button></Typography>
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