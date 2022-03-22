import React from 'react';
import { useContext, useEffect, useState } from 'react';
import AuctionCommp from './AuctionCommp';
import { Grid, Typography, Button } from '@mui/material';
import Store from '../store/Store';
import axios from 'axios';
import Keys from '../config';
import dateFormat from 'dateformat';
import Feed from '../component/Feed';
import Header from '../component/header/Header';
import CreateAuctionModal from '../pages/myAuctions/CreateAuctionModal';
import Spinner from 'react-spinkit';
import { trackPromise } from 'react-promise-tracker';
import { makeStyles } from '@material-ui/core/styles';
import LoadingIndicator from '../component/LoadingIndicator'

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

const CreatedAuction = () => {
  const [userAuth, setUserAuth] = useContext(Store);
  const [myAuctions, setMyAuctions] = useState([]);
  const [upAuctions, setUpAuctions] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [todayDate, setTodayDate] = useState(null);

  //new auction modal visibility handelers
  const [infoModalShow, setinfoModalShow] = useState(false);
  const handleCloseInfoModal = () => setinfoModalShow(false);
  const handleShowInfoModal = () => setinfoModalShow(true);

  var upcomingColor = 'rgb(231,111,81)'
  var pastColor = 'rgb(244,162,97)'

  const getUpcomingAuctions = () => {
    setUpAuctions(true);
    upcomingColor = 'rgb(231,111,81)'
    pastColor = 'rgb(244,162,97)'
  };
  const getPastAuctions = () => {
    setUpAuctions(false);
    upcomingColor = 'rgb(244,162,97)'
    pastColor = 'rgb(231,111,81)'
  };

  const getmyAuctions = async () => {
    try {
      const url = Keys.BASE_API + 'user/myAuctions';
      trackPromise(axios.get(url).then((res) => {
        setMyAuctions(res.data.myAuctions);
      }))

      var myDate = new Date();
      var x = dateFormat(myDate, "yyyy-mm-dd");
      setTodayDate(x);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(async () => {
    if (userAuth.isAuth) {
      getmyAuctions();

    } else {
      console.log("user not authorised");
    }
  }, [isLoading]);
  const styles = useStyles();

  return (
    <>
      <Header />
      <LoadingIndicator />
      <Grid component="main" className={styles.feed_comp}>
        {userAuth.isAuth ?
          <>
            <Grid container margin='auto' justifyContent='center' alignContent='center' >
              <Typography item xs={12} variant="h2" margin='auto' justifyContent='center' justifyText='center' style={{ fontStyle: 'serif' }}>MY AUCTIONS</Typography>
            </Grid>
            <Grid container spacing={2} paddingTop={5}>
              <Grid item xs={0} md={3}></Grid>
              <Grid item xs={12} md={6} margin='auto' >
                <Button variant="contained" style={{ backgroundColor: 'rgb(231,111,81)' }} onClick={getUpcomingAuctions}>Upcoming Auctions</Button>
                <Button variant="contained" style={{ backgroundColor: 'rgb(244,162,97)' }} onClick={getPastAuctions} >Past Auctions</Button>
              </Grid>
            </Grid>
            <Grid container margin='auto' justifyContent='center' alignContent='center' paddingTop={5}>
              {upAuctions ? myAuctions.map((auction) => (
                <>{(dateFormat(auction.end_date, "yyyy-mm-dd") > todayDate) && <Feed auction={auction} />}</>

              )) : myAuctions.map((auction) => (
                <>{(dateFormat(auction.end_date, "yyyy-mm-dd") < todayDate) && <Feed auction={auction} />}</>

              ))}
            </Grid>

            <Button onClick={handleShowInfoModal} style={{ margin: "1000px", backgroundColor: "red" }}>
              New Auction
                </Button>
            <CreateAuctionModal
              show={infoModalShow}
              onHide={handleCloseInfoModal}
            />
          </>
          : <h6>You need to login to continue</h6>}
      </Grid>
    </>
  );
};

export default CreatedAuction;
