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
    console.log(topBids);
  }, []);

  return (
    <div className="topBids">
      <div>
        {topBids ? (
          <>
            {topBids[0].bid_amount == 0 ? (
              <Typography>No Bid Yet. Be the First One to Bid.</Typography>
            ) : (
                <>
                  {topBids[0] ? (
                    <Typography variant="h6">
                      Highest Bid: $ {topBids[0].bid_amount}
                    </Typography>
                  ) : (
                      <></>
                    )}
                  {topBids[1] ? (
                    <Typography variant="h6">
                      Second Highest Bid: $ {topBids[1].bid_amount}
                    </Typography>
                  ) : (
                      <></>
                    )}
                  {topBids[2] ? (
                    <Typography variant="h6">
                      Third highest Bid: $ {topBids[2].bid_amount}
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
