import React from 'react'
import { Grid, Typography, Button, Box } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from '@mui/icons-material/Send';


const imageee = "https://mediacloud.saffronart.com/sourcingcen/prod/productimages/20220214/9830cb6c-1b54-4015-ae56-c74ea1e92103_2_tbig.jpg"


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
              <Typography variant='h3'>PRODUCT NAME</Typography>
            </Grid>

            <Grid item xs={11} md={11}>
              <Typography variant='body1'>
                Born in 1924 in Simla, Ram Kumar was among India’s leading modernists. He studied Economics at St. Stephen’s College, New Delhi, in 1946. Following this, he went to Paris to studyorn in 1924 in Simla, Ram Kumar was among India’s leading modernists. He studied Economics at St. Stephen’s College, New Delhi, in 1946. Following this, he went to Paris to study....
              </Typography>
            </Grid>

            <Grid item xs={11} md={8}>
              <Typography variant='h5'>
                STARTING BID : $1000
              </Typography>

              <Typography variant='h5'>
                ESTIMATED : $6000 - $10000
              </Typography>
            </Grid>
            <Grid item xs={11} md={8}>
              <Typography variant='h6'>
               Starting Date : 20 march 2022
              </Typography>
              <Typography variant='h6'>
               Starting time : 18.00 IST
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
                <Typography variant='body1'>Sold by - username</Typography>
                <Typography variant="body1">Category</Typography>
                <Typography variant='body2'>City , Pincode</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default AuctionProductDetail