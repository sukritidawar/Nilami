/* Component used in the bidding page, to display top three bidders for the auction.*/

import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Keys from '../config';
import { trackPromise } from 'react-promise-tracker';
import { Typography } from '@mui/material';
axios.defaults.withCredentials = true;

const TopBids = ({ id }) => {
  const [topBids, setTopBids] = useState('');
  const getTopBids = async () => {
    try {
      console.log(id);
      const url = Keys.BASE_API + 'auction/bidDetails/id/' + id;
      trackPromise(
        axios.get(url).then((res) => {
          console.log(res);
          setTopBids(res.data.bidDetails);
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    
    await getTopBids();
    var interval = setInterval(() =>{ getTopBids()},3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="topBids">
      <div>
        {topBids ? (
          <>
            {topBids[0].bid_amount == 0 ? (
              <Typography>No Bid Yet.</Typography>
            ) : (
                <>
                  {topBids[0] ? (
                    <Typography variant="h6">
                      Highest Bid: Rs {topBids[0].bid_amount}
                    </Typography>
                  ) : (
                      <></>
                    )}
                  {topBids[1] ? (
                    <Typography variant="h6">
                      2nd Highest Bid: Rs {topBids[1].bid_amount}
                    </Typography>
                  ) : (
                      <></>
                    )}
                  {topBids[2] ? (
                    <Typography variant="h6">
                      3rd highest Bid: Rs {topBids[2].bid_amount}
                    </Typography>
                  ) : (
                      <></>
                    )}
                </>
              )}
          </>
        ) : (
            <>Loading...</>
          )}
      </div>
    </div>
  );
};

export default TopBids;
