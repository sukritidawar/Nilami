import React, { useState, useEffect } from 'react';
import axios from "axios";
import Keys from "../config";
import { Grid, Typography, Button, Box } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from '@mui/icons-material/Send';


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

const useStyles = makeStyles((theme) => ({
  auction_comp: {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(5),
      boxShadow: "5px",
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(8),
      paddingLeft: theme.spacing(10),
      paddingBottom: theme.spacing(5),
    },
  }
}));

const AuctionProductDetail = () => {
  const styles = useStyles();

  const [auctionDetails, setAuctionDetails] = useState(defaultAuctionDetails);
  const [isLoading, setIsLoading] = useState(true);

  const getAuctionDetails = async (id) => {
    try {
      const url = Keys.BASE_API + "auction/id/" + id;
  
      const tempAuctionDetails = await axios.get(url);
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

  useEffect(async ()=>{
    await getAuctionDetails(18);
  },[isLoading]);
  
  return (
    <>
      <Grid container spacing={3} className={styles.auction_comp}>
        <Grid item xs={4} md={5}>
          <img
            srcSet={`${imageee}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="not there"
            loading="lazy"
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            <Grid item xs={11} md={8}>
              <Typography variant='h3'>{auctionDetails.productName}</Typography>
            </Grid>

            <Grid item xs={11} md={11}>
              <Typography variant='body1'>
              {auctionDetails.productDescription}
              </Typography>
            </Grid>

            <Grid item xs={11} md={8}>
              <Typography variant='h5'>
              {"STARTING BID : $" + auctionDetails.startingBid}
              </Typography>

              <Typography variant='h5'>
              {"ESTIMATED : $" + auctionDetails.estimate}
              </Typography>
            </Grid>
            <Grid item xs={11} md={8}>
              <Typography variant='h6'>
              {"Starting Date : " + auctionDetails.startDate}
              </Typography>
              <Typography variant='h6'>
              {"Starting time : " + auctionDetails.startTime}
              </Typography>
            </Grid>
            <Grid item xs={11} md={8}>
              <span style={{ marginRight: "20px" }}> <Button variant="contained">
                Register
              </Button></span>

              <Button variant="contained" endIcon={<SendIcon />}>
                Go to bidding
              </Button>
            </Grid>

            <Grid item xs={11} md={5}>
              <Box sx={{ boxShadow: "5", marginTop: "3" }}>
                <Typography variant="h5">Details</Typography>
                <Typography variant='body1'>{"Sold by - " + auctionDetails.auctioneerUserName}</Typography>
                <Typography variant="body1">{"Category - " + auctionDetails.auctionCategory}</Typography>
                <Typography variant='body2'>{"Address - " + auctionDetails.city + ", " + auctionDetails.pincode}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default AuctionProductDetail