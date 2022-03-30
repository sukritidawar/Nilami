import { React, useState } from 'react';

const Chat = ({ auctionId }) => {
  const [bids, setBids] = useState([]);
  const [bid, setBid] = useState('');
  const [highestBid, setHighestBid] = useState('');
  const [secondBid, setSecondBid] = useState('');
  const [thirdBid, setThirdBid] = useState('');

  const postBid = (event, value) => {
    event.preventDefault();
    setBids(bids.concat(value));
    updateBids(event, value);
    setBid('');
  };

  const updateBids = (event, value) => {
    event.preventDefault();
    (() => {
      if (value > highestBid) {
        setHighestBid(value);
      } else {
        if (value > secondBid) {
          setSecondBid(value);
        } else {
          if (value > thirdBid) {
            setThirdBid(value);
          }
        }
      }
    })();
  };

  return (
    <div className="bidChat">
      <div className="top3bids">
        <h3>1st bid: {highestBid}</h3>
        <h3>2nd bid: {secondBid}</h3>
        <h3>3rd bid: {thirdBid}</h3>
      </div>
      <div className="postBids">
        {bids.map((bid) => (
          <p>
            <strong>{bid.username}</strong> {bid.value}
          </p>
        ))}
      </div>
      {/* {user && ( */}
      <form className="postBidBox">
        <input
          className="postInput"
          type="text"
          placeholder="Add a bid"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
        />
        <button
          disabled={!bid}
          className="postButton"
          type="submit"
          onClick={postBid}
        >
          BID
        </button>
      </form>
      {/* )} */}
    </div>
  );
};

export default Chat;
