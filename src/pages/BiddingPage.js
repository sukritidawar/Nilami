import {React,useState,useEffect} from 'react';
import Chat from '../UIComponents/BiddingChat/Chat';
import Comments from '../UIComponents/Comments/Comments';
import TopBids from './TopBids';
import { Grid,Avatar, Typography,CssBaseline,Button } from '@mui/material';
import './BiddingPage.css';
import dateFormat from "dateformat";
import axios from "axios";
import Keys from "../config";
import Store from "../store/Store";
import Header from "../component/header/Header"
import { useParams, useLocation } from 'react-router-dom';
axios.defaults.withCredentials = true;

const imageee =
  'https://mediacloud.saffronart.com/sourcingcen/prod/productimages/20220214/9830cb6c-1b54-4015-ae56-c74ea1e92103_2_tbig.jpg';


const BiddingPage = (props) => {
  const [userAuth, setUserAuth] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    bid_amount: 0
  });
  const [timeUp,setTimeUp] = useState(false);
  const [feedback, setFeedback] = useState({
    feedback: "",
  });
  const auctionDetails = useLocation().state; 

  const checkTimings = async() => {
    var myDate = new Date();
    var currentDate = dateFormat(myDate, "yyyy-mm-dd");
    var currentTime = dateFormat(myDate, "HH:MM:ss");
    if((auctionDetails.endDate < currentDate) || ((auctionDetails.endDate == currentDate)&& (currentTime > auctionDetails.endTime)) ) 
      setTimeUp(true);
  }
  useEffect(async ()=>{
    await checkTimings();
    },[]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeedback = (msg) => {
    setFeedback({
      feedback: msg,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   send(formData);
    // setFormData({
    //     bid_amount : 0
    // });
  }; 

  const send = async(formData) =>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formData);
      console.log(body);
      const url = Keys.BASE_API + "user/bid/auction/" + id;
      const res = await axios.post(url,body,config);
      console.log(res); 
      handleFeedback(res.data.message);
    } catch (error) {
      handleFeedback(error);
    }
  }



  return (
   
    <>
    <Header/>
    {!timeUp ?<h6>this auction has ended</h6> : (
      <>
      <Grid
        container
        component="main"
        sx={{
          backgroundColor: 'rgb(38, 70, 83)',
          paddingLeft: 15,
          paddingBottom: 5,
          paddingRight: 15,
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            backgroundImage: `url(${imageee})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
            paddingTop: 2,
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          md={7}
          elevation={6}
          sx={{
            padding: 10,
            paddingLeft: 20,
            backgroundColor: 'rgb(233,196,106)',
            fontFamily: 'Montserrat',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={11} md={7}>
              <Typography variant="h3" style={{ fontFamily: 'serif', textTransform: 'uppercase' }}>
                {auctionDetails.productName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={11}
              md={5}
              sx={{ margin: 'auto', textAlign: 'right', alignItems: 'center' }}
            >
              <Typography>
                Category: {auctionDetails.auctionCategory}
              </Typography>
            </Grid>
            <Grid item xs={11} md={11}>
              <Typography variant="body1" style={{ fontFamily: 'lato' }}>
                {auctionDetails.productDescription}
              </Typography>
            </Grid>

            <Grid item xs={11} md={8}>
              <Typography variant="h6">
                {'Starting Bid : $' + auctionDetails.startingBid}
              </Typography>

              <Typography variant='h6'>
                {"Estimated Price: $" + auctionDetails.estimate}
              </Typography>
            </Grid>

            <Grid item xs={11} md={8}>
              <div><TopBids id={id} /></div>
            </Grid>

            <Grid item xs={11} md={8}>
              <Typography variant="h5">Location Details</Typography>
              <Typography>
                {'Address - ' +
                  auctionDetails.city +
                  ', ' +
                  auctionDetails.pincode}
              </Typography>
            </Grid>

            <Grid item xs={11} md={8} alignContent='center'>
              <Grid className='bidding-form' alignContent='center' margin='auto'>
                <form onSubmit={handleSubmit} method="POST">
                  <div style={{ padding: "10px", backgroundColor: 'rgb(233,196,106)', }}>
                    <input
                      name="bid_amount"
                      required="required"
                      type="integer"
                      placeholder="Amount"
                      onChange={handleChange}
                      style={{
                        backgroundColor: 'rgb(233,196,106)',
                        border: '2px solid rgb(38,70,83)'
                      }}
                    />
                  </div>
                  <Button type="submit" onClick={handleSubmit} variant="contained" style={{ backgroundColor: "rgb(38,70,83)" }} >Bid</Button>
                  <Typography className="feedback-box"> {feedback.feedback} </Typography>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
    )}</>
  );
};

export default BiddingPage;
