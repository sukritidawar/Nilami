import React from 'react';
import { useContext, useEffect, useState } from 'react';
import AuctionCommp from './AuctionCommp';
import { Grid, Typography, Button } from '@mui/material';
import Store from '../store/Store';
import axios from 'axios';
import Keys from '../config';
import dateFormat from 'dateformat';
import Feed from '../component/Feed';
import Header from '../component/header/Header'
import CreateAuctionModal from '../pages/myAuctions/CreateAuctionModal';
import Spinner from 'react-spinkit';
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
      var res = await axios.get(url);
      setMyAuctions(res.data.myAuctions);
      var myDate = new Date();
      var x = dateFormat(myDate, 'dd/mm/yy');
      setTodayDate(x);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    // if(userAuth.isAuth){
    getmyAuctions();

    // }else{
    //     console.log("user not authorised");
    // }
  }, [isLoading]);
  const styles = useStyles();

  const newAuctionFunc = (formData) => {
    console.log('gdgg');
    setMyAuctions((prevAddress) => {
      return [formData, ...prevAddress];
    });
  };

  return (
    <Grid component="main" >
      {<Header />}
      {/* {userAuth.isAuth ? */}
      {isLoading ? (
        <Spinner
          name="circle"
          style={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
          }}
        />
      ) : (
          <Grid className={styles.feed_comp}>
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
              {upAuctions ?
                <Typography item xs={12} margin='auto' justifyContent='center' variant='h3' justifyText='center'>Upcoming Auctions</Typography>
                :
                <Typography item xs={12} margin='auto' justifyContent='center' variant='h3' justifyText='center'>Past Auctions</Typography>}
            </Grid>
            <Grid container margin='auto' justifyContent='center' alignContent='center' paddingDown={10}>

              {upAuctions
                ?
                myAuctions.map((auction) => (
                  <>
                    {dateFormat(auction.end_date, 'dd/mm/yy') > todayDate && (
                      <Feed auction={auction} />
                    )}
                  </>
                ))
                : myAuctions.map((auction) => (
                  <>
                    {dateFormat(auction.end_date, 'dd/mm/yy') < todayDate && (
                      <Feed auction={auction} />
                    )}
                  </>
                ))
              }
              {/* <Grid item xs={12} md={12}>
                  <Button variant="contained" fullWidth>CREATE NEW AUCTION</Button>
                </Grid> */}

              <Grid item xs={12} margin='auto' justifyContent='center'>
                <Button variant='conatined' style={{ backgroundColor: 'rgb(42,157,143)' }} onClick={handleShowInfoModal}>New Auction</Button>
                <CreateAuctionModal
                  show={infoModalShow}
                  onHide={handleCloseInfoModal}
                />
              </Grid>
            </Grid>

            {/* : <h6>user not authorised</h6>} */}
          </Grid >
        )
      };
    </Grid >)
};

export default CreatedAuction;
