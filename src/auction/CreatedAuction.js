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

  const getUpcomingAuctions = () => {
    setUpAuctions(true);
  };
  const getPastAuctions = () => {
    setUpAuctions(false);
    console.log('kk')
  };

  const getmyAuctions = async () => {
    try {
      const url = Keys.BASE_API + 'auction/feed';/*'user/myAuctions';*/
      var res = await axios.get(url);
      setMyAuctions(res.data);
      /*setMyAuctions(res.data.myAuctions);*/
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
            <Grid container spacing={3} margin='auto' justifyContent='center'>
              <Typography item xs={12} variant="h3" margin='auto' justifyContent='center' justifyText='center'>MY AUCTIONS</Typography>
              <Grid item xs={12} margin='auto' justifyContent='center'>
                <Button variant="contained" style={{ backgroundColor: 'rgb(244,162,97)' }} onClick={getUpcomingAuctions}>Upcoming</Button>
                <Button variant="contained" style={{ backgroundColor: 'rgb(231,111,81)' }} onClick={getPastAuctions} >Past</Button>
              </Grid>
            </Grid>
            <Grid container margin='auto' justifyContent='center'>
              {upAuctions
                ? myAuctions.map((auction) => (
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
                ))}
            </Grid>
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
          </Grid>)
      }
      {/* : <h6>user not authorised</h6>} */}
    </Grid >
  );
};

export default CreatedAuction;
