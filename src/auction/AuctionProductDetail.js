import React, { useState, useEffect } from 'react';
import axios from "axios";
import Keys from "../config";
import { Grid, Typography, Button, Box, Container, CssBaseline } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const imageee = "https://mediacloud.saffronart.com/sourcingcen/prod/productimages/20220214/9830cb6c-1b54-4015-ae56-c74ea1e92103_2_tbig.jpg"

const defaultAuctionDetails = {
  productName: "Loading..",
  productDescription: "",
  startingBid: "",
  estimate: "",
  startDate: "",
  startTime: "",
  auctioneerUserName: "",
  auctionCategory: "",
  city: "",
  pincode: ""
}

const AuctionProductDetail = () => {
  const styles = useStyles();
  const { id } = useParams();
  console.log(id);
  const [auctionDetails, setAuctionDetails] = useState(defaultAuctionDetails);
  const [isLoading, setIsLoading] = useState(true);

  const getAuctionDetails = async () => {
    try {
      const url = Keys.BASE_API + "auction/id/" + id;
     console.log(url);
      const tempAuctionDetails = await axios.get(url);
      console.log(tempAuctionDetails);
      const fetchedAuctionDetails = {
        productName: tempAuctionDetails.data.product_name,
        productDescription: tempAuctionDetails.data.product_details,
        startingBid: tempAuctionDetails.data.starting_price + "",
        estimate: tempAuctionDetails.data.estimated_price + "",
        startDate: tempAuctionDetails.data.start_date,
        startTime: tempAuctionDetails.data.start_time,
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

  useEffect(async () => {
    await getAuctionDetails(18);
  }, [isLoading]);

  return (
    <>
      <ThemeProvider theme={theme}>
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
              <Grid item xs={11} md={8}>
                <Typography variant='h6'>
                  {"Start Date : " + auctionDetails.startDate}
                </Typography>
                <Typography variant='h6'>
                  {"Start time : " + auctionDetails.startTime}
                </Typography>
              </Grid>
              <Grid item xs={11} md={8}>
                <span style={{ marginRight: "20px" }}> <Button variant="contained" style={{ backgroundColor: "rgb(38,70,83)" }}>
                  Register
              </Button></span>

                <Button variant="contained" href="/" style={{ backgroundColor: "rgb(231,111,81)" }} endIcon={<SendIcon />}>
                  Go to bidding
              </Button>
              </Grid>

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
      </ThemeProvider>
    </>
  )
}

export default AuctionProductDetail