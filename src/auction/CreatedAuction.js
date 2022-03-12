import React from 'react'
import { useContext, useEffect, useState } from "react";
import AuctionCommp from './AuctionCommp'
import { Grid, Typography, Button } from '@mui/material';
import Store from "../store/Store";
import axios from "axios";
import Keys from "../config";
import dateFormat from "dateformat";
import Feed from "../component/Feed"
axios.defaults.withCredentials = true;

const CreatedAuction = () => {

  const [userAuth, setUserAuth] = useContext(Store);
  const [myAuctions,setMyAuctions] = useState([]);
  const [upAuctions,setUpAuctions] = useState(true);
  const [isLoading,setLoading] = useState(true);
  const [todayDate,setTodayDate] = useState(null);

  const getUpcomingAuctions = () => {
      setUpAuctions(true);
  }
  const getPastAuctions = () => {
      setUpAuctions(false);
  }

  const getmyAuctions = async () => {
      try {
          const url = Keys.BASE_API + "user/myAuctions";
          var res = await axios.get(url); 
          setMyAuctions(res.data.myAuctions);

          var myDate = new Date();
          var x = dateFormat(myDate, "dd/mm/yy");
          setTodayDate(x);
          setLoading(false);
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
  },[isLoading]);

  return (
    <>
      {/* {userAuth.isAuth ? */}
          <>
          {isLoading ? <h6>Loading...</h6> : (
              <>
                <Typography variant="h3">MY AUCTIONS</Typography>
                <button onClick={getUpcomingAuctions}>Upcoming</button>
                <button onClick={getPastAuctions}>Past</button>
                <Grid container spacing={3}>
                  {upAuctions ? myAuctions.map((auction) => (
                      <>{(dateFormat(auction.end_date,"dd/mm/yy") > todayDate) && <Feed auction = {auction} />}</>
                      
                  )):myAuctions.map((auction) => (
                      <>{(dateFormat(auction.end_date,"dd/mm/yy") < todayDate) && <Feed auction = {auction} />}</>
                      
                  ))}    
                </Grid>
                {/* <Grid item xs={12} md={12}>
                  <Button variant="contained" fullWidth>CREATE NEW AUCTION</Button>
                </Grid> */}
              </>
              )} 
          </>
      {/* : <h6>user not authorised</h6>} */}
    </>
            
  )
};

export default CreatedAuction