import React from 'react';
import { useContext, useEffect, useState } from 'react';
import AuctionCommp from './AuctionCommp';
import { Grid, Typography, Button } from '@mui/material';
import Store from '../store/Store';
import axios from 'axios';
import Keys from '../config';
import dateFormat from 'dateformat';
import Feed from '../component/Feed';
import CreateAuctionModal from '../pages/myAuctions/CreateAuctionModal';
import Spinner from 'react-spinkit';
import { trackPromise } from 'react-promise-tracker';
axios.defaults.withCredentials = true;

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
  };

  const getmyAuctions = async () => {
    try {
      const url = Keys.BASE_API + 'user/myAuctions';
      trackPromise(axios.get(url).then((res)=>{
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
  useEffect(async ()=>{
      // if(userAuth.isAuth){
          getmyAuctions();

    // }else{
    //     console.log("user not authorised");
    // }
  }, [isLoading]);

  return (
    <>
      {/* {userAuth.isAuth ? */}
      <>
        {/* {isLoading ? ( */}
        {/* ) : ( */}
          <>
          {/* {isLoading ? <h6>Loading...</h6> : ( */}
              <>
                <Typography variant="h3">MY AUCTIONS</Typography>
                <button onClick={getUpcomingAuctions}>Upcoming</button>
                <button onClick={getPastAuctions}>Past</button>
                <Grid container spacing={3}>
                  {upAuctions ? myAuctions.map((auction) => (
                      <>{(dateFormat(auction.end_date,"yyyy-mm-dd") > todayDate) && <Feed auction = {auction} />}</>
                      
                  )):myAuctions.map((auction) => (
                      <>{(dateFormat(auction.end_date,"yyyy-mm-dd") < todayDate) && <Feed auction = {auction} />}</>
                      
                  ))}    
                </Grid>
                {/* <Grid item xs={12} md={12}>
                  <Button variant="contained" fullWidth>CREATE NEW AUCTION</Button>
                </Grid> */}

                {/* <Button onClick={handleShowInfoModal} style={{margin:"100px",backgroundColor:"red"}}>
                  New Auction
                </Button>
                <CreateAuctionModal
                  show={infoModalShow}
                  onHide={handleCloseInfoModal} 
                /> */}
              </>
               {/* )}  */}
          </>
        {/* )} */}
      </>
      {/* : <h6>user not authorised</h6>} */}
    </>
  );
};

export default CreatedAuction;
