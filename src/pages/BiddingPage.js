import {React,useState,useEffect} from 'react';
import Chat from '../UIComponents/BiddingChat/Chat';
import Comments from '../UIComponents/Comments/Comments';
import TopBids from './TopBids';
import { Avatar, Typography } from '@mui/material';
import './BiddingPage.css';
import dateFormat from "dateformat";
import axios from "axios";
import Keys from "../config";
import Store from "../store/Store";
import { useParams, useLocation } from 'react-router-dom';
axios.defaults.withCredentials = true;

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
    var currentTime = dateFormat(myDate, "hh:MM:ss");
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
    <>{timeUp ?<h6>this auction has ended</h6> : (
      <div>

        {/* //   Navbar */}
        <div className="Container">
        {/* Auction Picture with details */}
        <div className="auctionDetails">
          <img
            src="https://picsum.photos/800/400"
            //   height={400}
            //   width={1000}
            alt="Auction"
          />
          <div className="productDetails">
            <Typography variant="body" component="body1">
              <p>{auctionDetails.productName}</p>
              <p>category: {auctionDetails.auctionCategory}</p>
              <p>Description: {auctionDetails.productDescription}</p>
              <p>Address: {auctionDetails.city}, {auctionDetails.pincode}</p>
              <p>Starting Bid: {auctionDetails.startingBid}</p>
              <p>Start Date: {auctionDetails.startDate}</p>
              <p>Start Time: {auctionDetails.startTime}</p>
              <p>End Date: {auctionDetails.endDate}</p>
              <p>End Time: {auctionDetails.endTime}</p>

            </Typography>
          </div>
      </div>

      {/* // top bids component */}
      <div><TopBids id={id}/></div>

      <div className='bidding-form'>
        <form onSubmit={handleSubmit} method="POST">
        <div style ={{padding : "10px"}}>
          <input
            name="bid_amount"
            required="required"
            type="integer"
            placeholder="amount"
            onChange={handleChange}
          />
        </div>
        <div style ={{padding : "10px"}}>
          <button type="submit" onClick={handleSubmit} >
            Bid
          </button>
        </div>
        <div className="feedback-box"> {feedback.feedback} </div>
        </form>
      </div>
      </div>
    </div>
    )}</>
  );
};

export default BiddingPage;
