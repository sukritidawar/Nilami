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
import Header from '../component/header/Header';
axios.defaults.withCredentials = true;

const RegisteredAuction = () => {
  const [userAuth, setUserAuth] = useContext(Store);
  const [regAuctions, setRegAuctions] = useState([]);
  const [upAuctions, setUpAuctions] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [todayDate, setTodayDate] = useState(null);

  const getUpcomingAuctions = () => {
    setUpAuctions(true);
  };
  const getPastAuctions = () => {
    setUpAuctions(false);
  };

  const getRegAuctions = async () => {
    try {
      const url = Keys.BASE_API + 'user/registeredAuctions';
      var res = await axios.get(url);
      setRegAuctions(res.data.registeredAuctions);

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
    getRegAuctions();

    // }else{
    //     console.log("user not authorised");
    // }
  }, [isLoading]);

  return (
    <>
      {<Header className="header" />}
      {isLoading ? (
        <Spinner
          name="circle"
          style={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <div className="all">
          <div className="registered">
            <Typography variant="h4">My Registered Auctions</Typography>
          </div>
          <div className="container">
            <div className="buttonWrap">
              <Button
                variant="contained"
                onClick={getUpcomingAuctions}
                className="upcoming"
              >
                Upcoming
              </Button>
              <Button
                variant="contained"
                onClick={getPastAuctions}
                className="past"
              >
                Past
              </Button>
            </div>
            <Grid container spacing={3}>
              {upAuctions
                ? regAuctions.map((auction) => (
                    <>
                      {dateFormat(auction.end_date, 'dd/mm/yy') > todayDate && (
                        <Feed auction={auction} />
                      )}
                    </>
                  ))
                : regAuctions.map((auction) => (
                    <>
                      {dateFormat(auction.end_date, 'dd/mm/yy') < todayDate && (
                        <Feed auction={auction} />
                      )}
                    </>
                  ))}
            </Grid>
          </div>
        </div>
      )}
      {/* : <h6>user not authorised</h6>} */}
    </>
  );
};

export default RegisteredAuction;
