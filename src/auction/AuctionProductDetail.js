import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Keys from "../config";
import { Grid, Typography, Button, Box, Container, CssBaseline } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import dateFormat from "dateformat";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuctionCommp from './AuctionCommp';
import { ContentPasteOutlined } from '@mui/icons-material';

const imageee = "https://mediacloud.saffronart.com/sourcingcen/prod/productimages/20220214/9830cb6c-1b54-4015-ae56-c74ea1e92103_2_tbig.jpg"

const defaultAuctionDetails = {
  productName: "Loading..",
  productDescription: "",
  startingBid: "",
  estimate: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  auctioneerUserName: "",
  auctionCategory: "",
  city: "",
  pincode: ""
}

const AuctionProductDetail = () => {
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);
  const [auctionDetails, setAuctionDetails] = useState(defaultAuctionDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [timeUp,setTimeUp] = useState(false);

  const getAuctionDetails = async () => {
    try {
      const url = Keys.BASE_API + "auction/id/" + id;
      const tempAuctionDetails = (await axios.get(url));
      const fetchedAuctionDetails = {
        productName: tempAuctionDetails.data.product_name,
        productDescription: tempAuctionDetails.data.product_details,
        startingBid: tempAuctionDetails.data.starting_price + "",
        estimate: tempAuctionDetails.data.estimated_price + "",
        startDate: dateFormat(tempAuctionDetails.data.start_date,"yyyy-mm-dd"),
        startTime: tempAuctionDetails.data.start_time,
        endDate: dateFormat(tempAuctionDetails.data.end_date, "yyyy-mm-dd"),
        endTime: tempAuctionDetails.data.end_time,
        auctioneerUserName: tempAuctionDetails.data.auctioneer_id,
        auctionCategory: tempAuctionDetails.data.product_category,
        city: tempAuctionDetails.data.city,
        pincode: tempAuctionDetails.data.pincode
      }
      setAuctionDetails(fetchedAuctionDetails);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  }
  const checkTimings = async() => {
    var myDate = new Date();
    var currentDate = dateFormat(myDate, "yyyy-mm-dd");
    var currentTime = dateFormat(myDate, "hh:MM:ss");
    if(auctionDetails.endDate){
      if((auctionDetails.endDate < currentDate) || ((auctionDetails.endDate == currentDate)&& (currentTime > auctionDetails.endTime)) ) 
        setTimeUp(true);
    }
  }
  
  const getRegAuctions = async () => {
    try {
        const url = Keys.BASE_API + "user/registeredAuctions";
        var res = await axios.get(url);
        const regAuctions = res.data.registeredAuctions;
        console.log(id);
        if(regAuctions){
          regAuctions.forEach(regAuction => {
            if(regAuction.auction_id == id){
              setIsRegistered(true);
            }
          });
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(async () => {
    await getAuctionDetails();
    await checkTimings();
    await getRegAuctions();
    console.log(isRegistered);
  }, [isLoading]);

  const registerUser = async() => {
    console.log("sfdfsdsfdf");
    try {
      const url = Keys.BASE_API + "user/register/auction";
      const body = JSON.stringify({auction_id : id});

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(url, body,config);
      console.log(res);
      alert("successfully registered!!");
      setIsRegistered(true);

    } catch (error) {
      
    }
  }

  return (
    <>
      
        <Grid container component="main" sx={{
          backgroundColor: 'rgb(42,157,143)',
          padding: 10
        }}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              /*border: '5px solid rgb(42,157,143);',*/
              backgroundImage: `url(${imageee})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textAlign: 'center',
              paddingTop: 2
            }}
          ></Grid>
          <Grid item xs={12} md={7} elevation={6} sx={{
            padding: 10,
            paddingLeft: 20,
            backgroundColor: 'rgb(233,196,106)',
            fontFamily: "Montserrat"
          }}>
            <Grid container spacing={3} >
              <Grid item xs={11} md={7}>
                <Typography variant='h3' style={{ fontFamily: "serif" }}>{auctionDetails.productName}</Typography>
              </Grid>
              <Grid item xs={11} md={5} sx={{ textAlign: "right" }}>
                <Typography variant="h7" > {auctionDetails.auctionCategory}</Typography>
              </Grid>
              <Grid item xs={11} md={11}>
                <Typography variant='body1' style={{ fontFamily: "lato" }}>
                  {auctionDetails.productDescription}
                </Typography>
              </Grid>

              <Grid item xs={11} md={8} >
                <Typography variant='h6'>
                  {"Starting Bid : $" + auctionDetails.startingBid}
                </Typography>

                <Typography variant='h6'>
                  {"Estimated Price: $" + auctionDetails.estimate}
                </Typography>
              </Grid>
              

              <>{timeUp ?<h6>Closed</h6> : (<>
                <Grid item xs={11} md={8}>
                <Typography variant='h6'>
                  {"Start Date : " + auctionDetails.startDate}
                </Typography>
                <Typography variant='h6'>
                  {"Start time : " + auctionDetails.startTime}
                </Typography>
              </Grid>
              <Grid item xs={11} md={8}>
                <Typography variant='h6'>
                  {"End Date : " + auctionDetails.endDate}
                </Typography>
                <Typography variant='h6'>
                  {"End time : " + auctionDetails.endTime}
                </Typography>
              </Grid>
                <Grid item xs={11} md={8}>
                
                {isRegistered ?
                  <Link to = {`/feed/${id}/biding`} state={auctionDetails}><button>Go to bidding</button></Link>
                :
                  <span style={{ marginRight: "20px" }}> 
                  <Button variant="contained" style={{ backgroundColor: "rgb(38,70,83)" }} onClick={registerUser}>
                    Register
                </Button></span>
                }
              
                {/* <Link
                  to={{
                    pathname: `/feed/${id}/biding`,
                    state: "sfsf" // your data array of objects
                  }}
                >sdsds</Link> */}
                {/* <Button variant="contained"component={Link}
                to = {`/feed/${id}/biding`}
                props={auctionDetails}
                 style={{ backgroundColor: "rgb(231,111,81)" }} 
                 endIcon={<SendIcon />}>
                  Go to bidding
              </Button> */}
              </Grid></>
              )}</>

              



              <Grid item xs={11} md={12}>
                <Grid container>
                  <Grid item md={7}></Grid>
                  <Box item xs={11} md={5} sx={{ marginTop: "3" }}>
                    <Typography variant="h5">Auctioneer Details</Typography>
                    <Typography variant='body1'>{"Sold by - " + auctionDetails.auctioneerUserName}</Typography>
                    <Typography variant='body2'>{"Address - " + auctionDetails.city + ", " + auctionDetails.pincode}</Typography>
                  </Box>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    
    </>
  )
}

export default AuctionProductDetail