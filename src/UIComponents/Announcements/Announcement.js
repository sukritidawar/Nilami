/* Announcement component displayed on top of Bidding Page*/
import React, { useContext } from 'react';
import AuctionnerAnnouncement from './AuctionnerAnnouncement';
import ParticipantsAnnouncement from './ParticipantsAnnouncement';
import { useParams, useLocation } from 'react-router-dom';

import Store from '../../store/Store';
const Announcement = () => {
  const [userAuth, setUserAuth] = useContext(Store);
  const userid = userAuth.user_id;
  const auctionDetails = useLocation().state;
  const auctioneerID = auctionDetails.auctioneerUserName;

  // If user id is equal to auctionner id then return auctionner component
  // Else participants components
  return (
    <>
      {userid === auctioneerID ? (
        <AuctionnerAnnouncement />
      ) : (
          <ParticipantsAnnouncement />
        )}
    </>
  );
};

export default Announcement;
