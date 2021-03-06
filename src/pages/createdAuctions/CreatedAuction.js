/* UI for User Created Auctions.
Displays the upcoming and past auctions created by the user.
Provides provision for adding new auction.
*/

import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Store from '../../store/Store';
import axios from 'axios';
import Keys from '../../config';
import dateFormat from 'dateformat';
import FeedCard from '../../UIComponents/FeedCard';
import Header from '../../UIComponents/Header';
import CreateAuctionModal from '../../UIComponents/modals/CreateAuctionModal';
import { trackPromise } from 'react-promise-tracker';
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
  const styles = useStyles();
  const [userAuth, setUserAuth] = useContext(Store);
  const [myAuctions, setMyAuctions] = useState(null);
  const [upAuctions, setUpAuctions] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  //new auction modal visibility handelers
  const [infoModalShow, setinfoModalShow] = useState(false);
  const handleCloseInfoModal = () => setinfoModalShow(false);
  const handleShowInfoModal = () => setinfoModalShow(true);

  var upcomingColor = 'rgb(231,111,81)';
  var pastColor = 'rgb(244,162,97)';

  // Handles UI changes for upcoming Auctions.
  const getUpcomingAuctions = () => {
    setUpAuctions(true);
    upcomingColor = 'rgb(231,111,81)';
    pastColor = 'rgb(244,162,97)';
  };

  // Handles UI changes for past Auctions.
  const getPastAuctions = () => {
    setUpAuctions(false);
    upcomingColor = 'rgb(244,162,97)';
    pastColor = 'rgb(231,111,81)';
  };

  // Get auctions created by the user.
  const getmyAuctions = async () => {
    try {
      const url = Keys.BASE_API + 'user/myAuctions';
      trackPromise(
        axios.get(url).then((res) => {
          setMyAuctions(res.data.myAuctions);
        })
      );

      var curDate = new Date();
      var currentDate = dateFormat(curDate, 'yyyy-mm-dd');
      setCurrentDate(currentDate);
      var currentTime = dateFormat(curDate, 'HH:MM:ss');
      setCurrentTime(currentTime);
    }
    catch (error) {
      console.log(error);
    }
  };
  const [onClickColorUpcoming, setOnClickColorUpcoming] = useState(true);
  const [onClickColorPast, setOnClickColorPast] = useState(false);

  // Changes color when Upcoming button is clicked.
  const clickUpcoming = () => {
    setOnClickColorUpcoming(true);
    setOnClickColorPast(false);
  };

  // Changes color when past button is clicked.
  const clickPast = () => {
    setOnClickColorUpcoming(false);
    setOnClickColorPast(true);
  };

  useEffect(async () => {
    getmyAuctions();
  }, [isLoading]);

  return (
    <>
      <Header />
      <Grid component="main" className={styles.feed_comp}>
        {userAuth.isAuth ? (
          <>
            {!myAuctions ? (
              <p> </p>
            ) : (
                <>
                  <Grid
                    container
                    margin="auto"
                    justifyContent="center"
                    alignContent="center"
                  >
                    <Typography
                      item
                      xs={12}
                      variant="h2"
                      margin="auto"
                      justifyContent="center"
                      justifyText="center"
                      style={{ fontStyle: 'serif' }}
                    >
                      My Auctions
                  </Typography>
                  </Grid>
                  <Grid container spacing={2} paddingTop={5}>
                    <Grid item xs={0} md={3}></Grid>
                    <Grid item xs={12} md={6} margin="auto">
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: onClickColorUpcoming
                            ? '#002E6E'
                            : '#00B9F1',
                        }}
                        onClick={() => {
                          getUpcomingAuctions();
                          clickUpcoming();
                        }}
                      >
                        Upcoming Auctions
                    </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: onClickColorPast
                            ? '#002E6E'
                            : '#00B9F1',
                        }}
                        onClick={() => {
                          getPastAuctions();
                          clickPast();
                        }}
                      >
                        Past Auctions
                    </Button>
                    </Grid>
                    <Button
                      variant="contained"
                      onClick={handleShowInfoModal}
                      style={{ backgroundColor: 'green' }}
                    >
                      <AddCircleIcon></AddCircleIcon>
                    </Button>
                    <CreateAuctionModal
                      show={infoModalShow}
                      onHide={handleCloseInfoModal}
                      style={{ top: '20px' }}
                    />
                  </Grid>
                  <Grid
                    container
                    margin="auto"
                    justifyContent="center"
                    alignContent="center"
                    paddingTop={5}
                  >
                    {upAuctions
                      ? myAuctions.map((auction) => (
                        <>
                          {(dateFormat(auction.end_date, 'yyyy-mm-dd') >
                            currentDate ||
                            (dateFormat(auction.end_date, 'yyyy-mm-dd') ==
                              currentDate &&
                              auction.end_time > currentTime)) && (
                              <FeedCard key={auction.auction_id} auction={auction} />
                            )}
                        </>
                      ))
                      : myAuctions.map((auction) => (
                        <>
                          {(dateFormat(auction.end_date, 'yyyy-mm-dd') <
                            currentDate ||
                            (dateFormat(auction.end_date, 'yyyy-mm-dd') ==
                              currentDate &&
                              auction.end_time < currentTime)) && (
                              <FeedCard key={auction.auction_id} auction={auction} />
                            )}
                        </>
                      ))}
                  </Grid>
                </>
              )}
          </>
        ) : (
            <h6>You need to login to continue</h6>
          )}
      </Grid>
    </>
  );
};

export default CreatedAuction;
