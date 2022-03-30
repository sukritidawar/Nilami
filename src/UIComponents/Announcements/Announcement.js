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
  // if user id is equal to auctionner id ther auctionner else participants
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
