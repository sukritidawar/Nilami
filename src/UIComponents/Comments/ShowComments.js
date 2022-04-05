// returns comment component in which user can see previous comment and  post new comment too

import React, { useState, useEffect, useRef, useContext } from 'react';
import { Fire } from '../chatApp/firebasee';
import Comments from './Comments';
import { useParams, useLocation } from 'react-router-dom';
import Store from '../../store/Store';


const ShowComments = () => {
  const scroll = useRef();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [userAuth, setUserAuth] = useContext(Store);
  const auctionDetails = useLocation().state;
  console.log(auctionDetails);
  const auctionId = id;
  const collectionName = 'Comments_' + auctionId;
  console.log(collectionName);
  useEffect(() => {
    Fire.collection(`${collectionName}`)
      .orderBy('createdAt')
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const userid = userAuth.user_id;
  
  return (
    <div style={{ margin: '30px', alignContent: 'center', textAlign: 'center' }}>
      <div className="msgs">
        <h2>Comments</h2>
        {messages.map(({ id, text, userName, uid }) => (
          <div style={{ textAlign: 'left' }}>
            <div
              key={id}
              className={`msg ${uid === userid ? 'sent' : 'received'}`}
            >
              <b>{userName}:</b> {text}
            </div>
          </div>
        ))}
      </div>
      <Comments scroll={scroll} collectionName={collectionName} />
      <div ref={scroll}></div>
    </div>
  );
};

export default ShowComments;
