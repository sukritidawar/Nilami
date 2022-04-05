import { React, useState, useEffect, useContext } from 'react';
import ShowComments from '../../UIComponents/Comments/ShowComments';
import TopBids from '../../UIComponents/TopBids';
import { Grid, Typography, CssBaseline, Button, } from '@mui/material';
import './BiddingPage.css';
import dateFormat from 'dateformat';
import axios from 'axios';
import Keys from '../../config';
import Store from '../../store/Store';
import Announcement from '../../UIComponents/Announcements/Announcement';
import Header from '../../UIComponents/Header';
import { useParams, useLocation } from 'react-router-dom';

axios.defaults.withCredentials = true;
const image =
  'https://mediacloud.saffronart.com/sourcingcen/prod/productimages/20220214/9830cb6c-1b54-4015-ae56-c74ea1e92103_2_tbig.jpg';

const BiddingPage = (props) => {
  const [userAuth, setUserAuth] = useContext(Store);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    bid_amount: 0,
  });
  const [timeUp, setTimeUp] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [feedback, setFeedback] = useState({
    feedback: '',
  });
  const auctionDetails = useLocation().state;

  //Check if the auction is an ongoing one, upcoming one or completed.
  const checkTimings = async () => {
    var myDate = new Date();
    var currentDate = dateFormat(myDate, 'yyyy-mm-dd');
    var currentTime = dateFormat(myDate, 'HH:MM:ss');
    if (
      auctionDetails.endDate < currentDate ||
      (auctionDetails.endDate == currentDate &&
        currentTime > auctionDetails.endTime)
    )
      setTimeUp(true);
    if (
      auctionDetails.startDate < currentDate ||
      (auctionDetails.startDate == currentDate &&
        currentTime > auctionDetails.startTime)
    )
      setHasStarted(true);
    console.log(hasStarted);
  };

  useEffect(async () => {
    await checkTimings();
    console.log(userAuth.user_id);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeedback = (msg) => {
    setFeedback({
      feedback: msg,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(formData);
    setFeedback('');
  };

  // Adds bidding details of the user to the database.
  const send = async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(formData);
      console.log(body);
      const url = Keys.BASE_API + 'user/bid/auction/' + id;
      const res = await axios.post(url, body, config);
      console.log(res);
      if (res.data.message)
        handleFeedback(res.data.message);
      else
        handleFeedback('something went wrong, try again');
    } catch (error) {
      console.log(error);
      handleFeedback('something went wrong, try again');
    }
  };

  // Checks if the auction is closed.
  const handleCloseAuction = async () => {
    try {
      const url = Keys.BASE_API + 'auction/close/' + id;
      const res = await axios.put(url);
      setTimeUp(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      {userAuth.isAuth ? (
        <>
          {timeUp ? (
            <h6>The auction has ended.</h6>
          ) : (
              <>
                {!hasStarted ? (
                  <h6>Auction will start soon...</h6>
                ) : (
                    <>
                      <Grid
                        container
                        sx={{
                          border: '2px solid #00B9F1',
                          // margin: 5,
                          marginLeft: 20,
                          marginTop: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          maxWidth: 1117,
                          borderRadius: 4,
                        }}
                      >
                        <Announcement />
                      </Grid>
                      <Grid
                        component="main"
                        sx={{
                          marginTop: 5,
                          marginBottom: 5,
                          paddingLeft: 20,
                          paddingRight: 20,
                        }}
                      >
                        <Grid
                          container
                          sx={{
                            border: '2px solid #00B9F1',
                            borderRadius: 4,
                          }}
                        >
                          <CssBaseline />
                          <Grid item xs={12} md={7} lg={9}>
                            <Grid container>
                              <Grid
                                item
                                xs={12}
                                lg={5}
                                sx={{
                                  backgroundImage: `url(${image})`,
                                  backgroundRepeat: 'no-repeat',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  textAlign: 'center',
                                  paddingTop: 2,
                                  minHeight: 300,
                                  borderRadius: 4,
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
                                  <Grid item xs={12}>
                                    <Typography
                                      variant="body1"
                                      style={{ fontFamily: 'lato' }}
                                    >
                                      {auctionDetails.isPrivate ? (
                                        <>
                                          <p style={{ color: 'green' }}>
                                            (Private Auction)
                                      </p>
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
                                    style={{
                                      textAlign: 'center',
                                      alignContent: 'center',
                                    }}
                                  >
                                    <Typography variant="h5">
                                      {'Starting Bid : $' +
                                        auctionDetails.startingBid}
                                    </Typography>

                                    <Typography variant="h5">
                                      {'Estimated Price: $' +
                                        auctionDetails.estimate}
                                    </Typography>
                                  </Grid>

                                  {auctionDetails.auctioneerUserName ==
                                    userAuth.user_id ? (
                                      <Grid item xs={12} md={8}>
                                        <Button onClick={handleCloseAuction}>
                                          Close Auction
                                  </Button>
                                      </Grid>
                                    ) : (
                                      <></>
                                    )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            md={5}
                            lg={3}
                            sx={{ borderLeft: '2px solid #00B9F1', padding: 2 }}
                          >
                            <Grid item xs={12}>
                              <TopBids id={id} />
                            </Grid>

                            <Grid item xs={12} style={{ position: 'relative', top: 90 }}>
                              <Grid
                                className="bidding-form"
                                alignContent="center"
                                justifyContent="center"
                                margin="auto"
                                textAlign="center"
                              >
                                <form
                                  onSubmit={handleSubmit}
                                  method="POST"
                                  alignContent="center"
                                  justifyContent="center"
                                  textAlign="center"
                                >
                                  <Grid
                                    alignContent="center"
                                    justifyContent="center"
                                    textAlign="center"
                                  >
                                    <input
                                      name="bid_amount"
                                      required="required"
                                      type="integer"
                                      placeholder="Amount"
                                      onChange={handleChange}
                                    />
                                  </Grid>
                                  <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    variant="contained"
                                    style={{
                                      backgroundColor: '#002E6E',
                                      marginTop: 3,
                                    }}
                                  >
                                    Bid
                              </Button>
                                  {feedback.feedback ? (
                                    <Typography className="feedback-box">
                                      {' '}
                                      {feedback.feedback}{' '}
                                    </Typography>
                                  ) : (
                                      <></>
                                    )}
                                </form>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        sx={{
                          border: '2px solid #00B9F1',
                          marginLeft: 20,
                          marginTop: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          maxWidth: 1117,
                          borderRadius: 4,
                        }}
                      >
                        <ShowComments />
                      </Grid>
                    </>
                  )}
              </>
            )}
        </>
      ) : (
          <Typography>You need to login</Typography>
        )}
    </>
  );
};

export default BiddingPage;
