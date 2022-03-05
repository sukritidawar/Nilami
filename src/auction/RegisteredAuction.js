import React from 'react'
import AuctionCommp from './AuctionCommp'
import { Grid, Typography, Button } from '@mui/material';
const RegisteredAuction = () => {
    return (
        <>
            <Typography variant="h3">MY REGISTERED AUCTION</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <AuctionCommp buttonname="Go to Bidding Page" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <AuctionCommp buttonname="Go to Bidding Page" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <AuctionCommp buttonname="Go to Bidding Page" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <AuctionCommp buttonname="Go to Bidding Page" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <AuctionCommp buttonname="Go to Bidding Page" />
                </Grid><Grid item xs={12} md={3}>
                    <AuctionCommp buttonname="Go to Bidding Page" />
                </Grid><Grid item xs={12} md={3}>
                    <AuctionCommp buttonname="Go to Bidding Page" />
                </Grid><Grid item xs={12} md={3}>
                    <AuctionCommp buttonname="Go to Bidding Page" />
                </Grid><Grid item xs={12} md={3}>
                    <AuctionCommp buttonname="Go to Bidding Page" />
                </Grid>
            </Grid>
        </>

    )
}

export default RegisteredAuction