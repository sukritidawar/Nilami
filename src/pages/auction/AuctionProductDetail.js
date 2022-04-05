/* UI to display the Auction detail page.
Displays the following details for each auction:
  Product Name,
  Auction Category,
  Product Description,
  Starting Bid,
  Estimated Price,
  Start Date,
  End Date,
  City,
  Winner User name, if present.
Also allows to register for the auction and bid.
*/

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Keys from '../../config';
import { Grid, Typography, Button, Box, CssBaseline } from '@mui/material';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import RegisterModal from '../../UIComponents/modals/RegisterModal';
import { trackPromise } from 'react-promise-tracker';
import Store from '../../store/Store';
import Header from '../../UIComponents/Header';


const defaultAuctionDetails = {
  productName: 'Loading..',
  productDescription: '',
  startingBid: '',
  estimate: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  auctioneerUserName: '',
  auctionCategory: '',
  city: '',
  pincode: '',
};

const AuctionProductDetail = () => {
  const { id } = useParams();
  const [userAuth, setUserAuth] = useContext(Store);
  const [isRegistered, setIsRegistered] = useState(false);
  const [auctionDetails, setAuctionDetails] = useState(defaultAuctionDetails);
  const [timeUp, setTimeUp] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [winnerName, setWinnerName] = useState('Anonymous');
  const [infoModalShow, setinfoModalShow] = useState(false);
  const handleCloseInfoModal = () => setinfoModalShow(false);
  const handleShowInfoModal = () => setinfoModalShow(true);
  const updateRegisterInfo = () => {
    setIsRegistered(true);
  };

  // Fetch the details for auction.
  const getAuctionDetails = async () => {
    try {
      const url = Keys.BASE_API + 'auction/id/' + id;
      trackPromise(
        axios.get(url).then((tempAuctionDetails) => {
          setAuctionDetails({
            productName: tempAuctionDetails.data.product_name,
            productDescription: tempAuctionDetails.data.product_details,
            startingBid: tempAuctionDetails.data.starting_price + '',
            estimate: tempAuctionDetails.data.estimated_price + '',
            startDate: dateFormat(
              tempAuctionDetails.data.start_date,
              'yyyy-mm-dd'),
            startTime: tempAuctionDetails.data.start_time,
            endDate: dateFormat(
              tempAuctionDetails.data.end_date,
              'yyyy-mm-dd'),
            endTime: tempAuctionDetails.data.end_time,
            auctioneerUserName: tempAuctionDetails.data.auctioneer_id,
            auctionCategory: tempAuctionDetails.data.product_category,
            city: tempAuctionDetails.data.city,
            pincode: tempAuctionDetails.data.pincode,
            winner_user_id: tempAuctionDetails.data.winner_user_id,
            isPrivate: tempAuctionDetails.data.is_private,
          });
          checkTimings(
            dateFormat(tempAuctionDetails.data.start_date, 'yyyy-mm-dd'),
            tempAuctionDetails.data.start_time,
            dateFormat(tempAuctionDetails.data.end_date, 'yyyy-mm-dd'),
            tempAuctionDetails.data.end_time
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Check if the auction is an ongoing one, has already completed or is upcoming.
  const checkTimings = async (
    auctionStartDate,
    auctionStartTime,
    auctionEndDate,
    auctionEndTime
  ) => {
    var curDate = new Date();
    var currentDate = dateFormat(curDate, 'yyyy-mm-dd');
    var currentTime = dateFormat(curDate, 'HH:MM:ss');
    if (auctionEndDate) {
      if (
        auctionEndDate < currentDate ||
        (auctionEndDate == currentDate && currentTime > auctionEndTime)
      ) {
        setTimeUp(true);
      }
    }
    if (auctionStartDate) {
      if (
        auctionStartDate < currentDate ||
        (auctionStartDate == currentDate && currentTime > auctionStartTime)
      ) {
        setHasStarted(true);
      }
    }
  };

  // Check if the user has registered for the auction.
  const getRegAuctions = async () => {
    try {
      const url = Keys.BASE_API + 'user/registeredAuctions';
      var res = await axios.get(url);
      const regAuctions = res.data.registeredAuctions;
      if (regAuctions) {
        regAuctions.forEach((regAuction) => {
          if (regAuction.auction_id == id) {
            setIsRegistered(true);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get user name of the auction winner, if present.
  const getWinnerName = async () => {
    try {
      const url = Keys.BASE_API + 'auction/getWinnerName/id/' + id;
      trackPromise(
        axios.get(url).then((res) => {
          setWinnerName(res.data[0].user_name);
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await getAuctionDetails();
    await getRegAuctions();
    await getWinnerName();
  }, []);

  // Displays the register modal, when user clicks on Register button.
  const registerUser = async () => {
    if (userAuth.isAuth) {
      handleShowInfoModal();
    } else {
      alert('login to register');
    }
  };

  return (
    <>
      <Header />
      <Grid
        component="main"
        sx={{
          marginTop: 10,
          marginBottom: 10,
          paddingLeft: 25,
          paddingRight: 25,
          alignItems: 'center',
        }}
      >
        <Grid
          container
          sx={{
            border: '3px solid #00B9F1',
            padding: 2,
            borderRadius: 4,
          }}
        >
          <CssBaseline />
          <Grid
            item
            xs={12}
            lg={5}
            sx={{
              backgroundImage: `url(${auctionDetails.productPic})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textAlign: 'center',
              paddingTop: 2,
              minHeight: 330,
            }}
          ></Grid>
          <Grid
            item
            xs={12}
            lg={7}
            elevation={6}
            sx={{
              padding: 2,
              paddingLeft: 5,
              fontFamily: 'Montserrat',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  style={{
                    fontFamily: 'serif',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}
                >
                  {auctionDetails.productName}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  margin: 'auto',
                  textAlign: 'right',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5">
                  Category: {auctionDetails.auctionCategory}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" style={{ fontFamily: 'lato' }}>
                  {auctionDetails.isPrivate ? (
                    <>
                      <p style={{ color: 'green' }}>(Private Auction)</p>
                    </>
                  ) : (
                      <></>
                    )}
                  {auctionDetails.productDescription}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                style={{ textAlign: 'center', alignContent: 'center' }}
              >
                <Typography variant="h5">
                  {'Starting Bid : $' + auctionDetails.startingBid}
                </Typography>

                <Typography variant="h5">
                  {'Estimated Price: $' + auctionDetails.estimate}
                </Typography>
              </Grid>

              <>
                {timeUp ? (
                  <>
                    <Grid
                      item
                      xs={12}
                      style={{ textAlign: 'center', alignContent: 'center' }}
                    >
                      <Typography variant="h4" style={{ color: 'red' }}>
                        Closed
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ textAlign: 'center', alignContent: 'center' }}
                    >
                      <Typography variant="h5">Winner: {winnerName}</Typography>
                    </Grid>
                    {userAuth.isAuth ? (
                      <>
                        {(() => {
                          if (
                            userAuth.user_id ==
                            auctionDetails.auctioneerUserName ||
                            userAuth.user_id == auctionDetails.winner_user_id
                          ) {
                            return (
                              <Link
                                to={`/feed/${id}/chat`}
                                state={auctionDetails}
                                style={{ textDecoration: 'none' }}
                              >
                                <Button
                                  variant="contained"
                                  style={{ backgroundColor: '	#002E6E' }}
                                >
                                  CHAT
                                </Button>
                              </Link>
                            );
                          }
                        })()}
                      </>
                    ) : (
                        <h6></h6>
                      )}
                  </>
                ) : (
                    <>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ textAlign: 'center', alignContent: 'center' }}
                      >
                        <Typography variant="h6">
                          {'Start Date : ' + auctionDetails.startDate}
                        </Typography>
                        <Typography variant="h6">
                          {'Start Time : ' + auctionDetails.startTime}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ textAlign: 'center', alignContent: 'center' }}
                      >
                        <Typography variant="h6">
                          {'End Date : ' + auctionDetails.endDate}
                        </Typography>
                        <Typography variant="h6">
                          {'End Time : ' + auctionDetails.endTime}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        style={{
                          justifyContent: 'center',
                          textAlign: 'center',
                          aligncontent: 'center',
                          marginTop: 2,
                        }}
                      >
                        {isRegistered ? (
                          <>
                            {hasStarted ? (
                              <>
                                <Typography style={{ color: '	#002E6E' }}>
                                  You have registered for the auction. Please
                                  proceed with bidding.
                              </Typography>
                                <Link
                                  to={`/feed/${id}/biding`}
                                  state={auctionDetails}
                                  style={{ textDecoration: 'none' }}
                                >

                                  <Button
                                    variant="contained"
                                    style={{ backgroundColor: '#002E6E' }}
                                  >
                                    Go to bidding
                                </Button>
                                </Link>
                              </>
                            ) : (
                                <Typography style={{ color: '	#002E6E' }}>
                                  You have registered for the auction.
                                </Typography>
                              )}
                          </>
                        ) : (
                            <span style={{ marginRight: '20px' }}>
                              <Button
                                variant="contained"
                                style={{ backgroundColor: '	#002E6E' }}
                                onClick={registerUser}
                              >
                                Register
                          </Button>
                              <RegisterModal
                                id={id}
                                show={infoModalShow}
                                onHide={handleCloseInfoModal}
                                onRegister={updateRegisterInfo}
                              />
                            </span>
                          )}
                      </Grid>
                    </>
                  )}
              </>

              <Grid item xs={12}>
                <Grid container>
                  <Grid item md={7}></Grid>
                  <Box item xs={11} md={5} sx={{ marginTop: '5' }}>
                    <Typography variant="h5">Location Details</Typography>
                    <Typography>
                      {'Address - ' +
                        auctionDetails.city +
                        ', ' +
                        auctionDetails.pincode}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AuctionProductDetail;
