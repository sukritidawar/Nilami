import React from 'react'
import { Grid,Box, Typography,Butto, TextField, Button } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";


const imageee = "https://mediacloud.saffronart.com/sourcingcen/prod/productimages/20220214/9830cb6c-1b54-4015-ae56-c74ea1e92103_2_tbig.jpg"

const useStyles = makeStyles((theme) => ({
    bidding_comp: {
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

const BiddingPage = () => {
    const styles = useStyles();
    return (
        <>
            <Grid container spacing={3} className={styles.bidding_comp}>
                <Grid item xs={12} md={8}>
                   <Grid container>
                       <Grid item xs={12} md={5}>
                       <img
                        srcSet={`${imageee}?w=160&h=160&fit=crop&auto=format&dpr=3 3x`}
                        alt="not there"
                        loading="lazy"
                    />
                       </Grid>
                       <Grid item xs={12} md={7}>
                           <Typography variant='h3'>Product name</Typography>
                           <br></br>
                           <Typography variant='h5'>CURRENT BIDDING AMOUNT - $5000</Typography>
                           <br></br>
                           <Typography variant='h5'>STARTING BIDDING AMOUNT - $1000</Typography>

                       </Grid>
                       <Grid item xs={12} md={7}>
                       <Typography>You will review before this is final</Typography>
                       <Typography>Sharing link / end time / liked by/details link</Typography>
                       </Grid>
                   </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                   <Box sx={{boxShadow:"5" ,marginRight:"25px", height:"75vh"}}>
                   <Typography variant='h5'>
                   third bit - amount - by
                   </Typography>
                   <Typography variant='h5'>
                   second bit - amount - by
                   </Typography>
                   <Typography variant='h5'>
                   first bit - amount - by
                   </Typography>
                   <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                   <Button variant="contained"> Place bid</Button>
                   </Box>
                </Grid>

            </Grid>
        </>
    )
}

export default BiddingPage