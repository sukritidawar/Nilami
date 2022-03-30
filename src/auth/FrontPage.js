import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@mui/material/CssBaseline';
const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: '#264653',
    color: 'white',
    height: '100vh',
  },
  grid_styling: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingBottom: theme.spacing(5),
  },

  img_styling: {
    width: 500,
    height: 500,
    marginTop: theme.spacing(13),
  },
}));
const FrontPage = () => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.body}>
        <CssBaseline />
        <Grid container>
          <Grid item xs={12} md={7} className={styles.grid_styling}>
            <img srcSet={require(`../images/logo.jpeg`)} alt="logo" />
            <Typography
              variant="body1"
              style={{
                alignSelf: 'center',
                marginLeft: '75px',
              }}
            >
              There are times when we want to sell something at the best price
              in a very short interval of time. Auction is the best option to do
              that. Our application “Niलाmi” will allow the people to host the
              auction publicly at large scale or it could be private to a small
              group of people.There are times when we want to sell something at
              the best price in a very short interval of time. Auction is the
              best option to do that. Our application “Niलाmi” will allow the
              people to host the auction publicly at large scale or it could be
              private to a small group of people.here are times when we want to
              sell something at the best price in a very short interval of time.
              Auction is the best option to do that.when we want to sell
              something at the best price in a very short interval of time.
            </Typography>

            <Button
              variant="contained"
              style={{
                borderRadius: 30,
                backgroundColor: '#2A9D8F',
                padding: '10px 20px',
                fontSize: '16px',
                marginTop: '40px',
                marginLeft: '250px',
              }}
            >
              {' '}
              Login
            </Button>
            <Button
              variant="contained"
              style={{
                borderRadius: 30,
                backgroundColor: '#2A9D8F',
                padding: '10px 20px',
                fontSize: '16px',
                marginTop: '40px',
                marginLeft: '20px',
              }}
            >
              {' '}
              Signup
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <img
              srcSet={`https://img.freepik.com/free-vector/bid-design-background_52683-76080.jpg`}
              loading="lazy"
              alt="auction-img"
              className={styles.img_styling}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default FrontPage;
