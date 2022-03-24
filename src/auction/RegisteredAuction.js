import React from 'react';
import { useContext, useEffect, useState } from 'react';
import AuctionCommp from './AuctionCommp';
import { Grid, Typography, Button } from '@mui/material';
import Store from '../store/Store';
import axios from 'axios';
import Keys from '../config';
import dateFormat from 'dateformat';
import Feed from '../component/Feed';
import Spinner from 'react-spinkit';
import './RegsiteredAuction.css';
import { trackPromise } from 'react-promise-tracker';
import Header from '../component/header/Header'
import LoadingIndicator from '../component/LoadingIndicator'
import { makeStyles } from '@material-ui/core/styles';

axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  feed_comp: {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(5),
      boxShadow: '5px',
      marginLeft: '5vw',
      marginRight: '5vw',
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(5),
      marginLeft: '5vw',
      marginRight: '5vw',
    },
  },
}));

const RegisteredAuction = () => {
  const [userAuth, setUserAuth] = useContext(Store);
  const [regAuctions, setRegAuctions] = useState(null);
  const [upAuctions, setUpAuctions] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  const getUpcomingAuctions = () => {
    setUpAuctions(true);
  };
  const getPastAuctions = () => {
    setUpAuctions(false);
  };

  const getRegAuctions = async () => {
    try {
      const url = Keys.BASE_API + 'user/registeredAuctions';
      trackPromise(axios.get(url).then((res) => {
        setRegAuctions(res.data.registeredAuctions);
      }))
      var myDate = new Date();
      var x = dateFormat(myDate, 'yyyy-mm-dd');
      setCurrentDate(x);
      x= dateFormat(myDate, "HH:MM:ss");
      setCurrentTime(x); 
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    // if(userAuth.isAuth){
    getRegAuctions();

    // }else{
    //     console.log("user not authorised");
    // }
  }, [isLoading]);
  const styles = useStyles();


  return (
    <>
      <Header />
      {!regAuctions ? <p> </p>:
        <Grid component="main" className={styles.feed_comp}>
        {userAuth.isAuth ?
          <>
            <Grid container margin='auto' justifyContent='center' alignContent='center' >
              <Typography item xs={12} variant="h2" margin='auto' justifyContent='center' justifyText='center' style={{ fontStyle: 'serif' }}>
                MY REGISTERED AUCTIONS
              </Typography>
            </Grid>
            <Grid container spacing={2} paddingTop={5}>
              <Grid item xs={0} md={3}></Grid>
              <Grid item xs={12} md={6} margin='auto' >
                <Button variant="contained" style={{ backgroundColor: 'rgb(231,111,81)' }} onClick={getUpcomingAuctions}>Upcoming Auctions</Button>
                <Button variant="contained" style={{ backgroundColor: 'rgb(244,162,97)' }} onClick={getPastAuctions} >Past Auctions</Button>
              </Grid>
            </Grid>
            <Grid container margin='auto' justifyContent='center' alignContent='center' paddingTop={5}>
                  {upAuctions ? regAuctions.map((auction) => (
                    <>{((dateFormat(auction.end_date, "yyyy-mm-dd") > currentDate) || ((dateFormat(auction.end_date, "yyyy-mm-dd") == currentDate)&&(auction.end_time > currentTime))) && <Feed key={auction.auction_id} auction={auction} />}</>

                  )) : regAuctions.map((auction) => (
                    <>{((dateFormat(auction.end_date, "yyyy-mm-dd") < currentDate) || ((dateFormat(auction.end_date, "yyyy-mm-dd") == currentDate)&&(auction.end_time < currentTime))) && <Feed key={auction.auction_id} auction={auction} />}</>

                  ))}
            </Grid>
          </>
          : <h6>You need to login to continue</h6>}
      </Grid>
      }
    </>
  );
};

export default RegisteredAuction
