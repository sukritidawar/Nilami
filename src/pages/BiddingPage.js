import React from 'react';
import Chat from '../UIComponents/BiddingChat/Chat';
import Comments from '../UIComponents/Comments/Comments';
import { Avatar, Typography } from '@mui/material';
import './BiddingPage.css';

const BiddingPage = (props) => {
  return (
    //   Navbar
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
            {props.desc}
          </Typography>
        </div>
        <div className="auctionOrganizer">
          <Typography variant="h4" className="Typo">
            Organizer:
          </Typography>
          <Avatar
            alt={props.username}
            src="https://picsum.photos/15"
            className="avatar"
          />
          <Typography variant="h4">{props.username}</Typography>
        </div>
        {/* Comments */}
        <div className="comments">
          <Comments />
        </div>
      </div>
      {/* Live Bidding Chat */}
      <div className="bidChat">
        <Chat auctionId={'12234'} />
      </div>
    </div>
  );
};

export default BiddingPage;
