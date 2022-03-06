import React from 'react'
import AuctionCommp from './AuctionCommp'
import { Grid, Typography, Button } from '@mui/material';

const CreatedAuction = () => {
  return (
    <>
      <Typography variant="h3">MY ORGANIZED AUCTION</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <AuctionCommp buttonname="See product details" />
        </Grid>
        <Grid item xs={12} md={3}>
          <AuctionCommp buttonname="See product details" />
        </Grid>
        <Grid item xs={12} md={3}>
          <AuctionCommp buttonname="See product details" />
        </Grid>
        <Grid item xs={12} md={3}>
          <AuctionCommp buttonname="See product details" />
        </Grid>
        <Grid item xs={12} md={3}>
          <AuctionCommp buttonname="See product details" />
        </Grid><Grid item xs={12} md={3}>
          <AuctionCommp buttonname="See product details" />
        </Grid><Grid item xs={12} md={3}>
          <AuctionCommp buttonname="See product details" />
        </Grid><Grid item xs={12} md={3}>
          <AuctionCommp buttonname="See product details" />
        </Grid><Grid item xs={12} md={3}>
          <AuctionCommp buttonname="See product details" />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button variant="contained" fullWidth>CREATE NEW AUCTION</Button>
        </Grid>


      </Grid>
    </>
  )
};

export default CreatedAuction