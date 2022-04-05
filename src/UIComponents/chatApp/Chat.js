/* Chat component that is displayed to winner of auction and auctioneer after the auction ends.*/

import React, { useState, useEffect, useRef, useContext } from 'react';
import { Fire } from './firebasee';
import SendMessage from './SendMessage';
import { useParams, useLocation } from 'react-router-dom';
import Store from '../../store/Store';
import Header from '../Header'

function Chat() {
  const scroll = useRef();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [userAuth, setUserAuth] = useContext(Store);
  const auctionDetails = useLocation().state;
  console.log(auctionDetails);

  const auctionId = id;
  const auctioneerID = auctionDetails.auctioneerUserName;
  const winnerId = auctionDetails.winnerid;
  const collectionName = auctionId + '_' + auctioneerID + '_' + winnerId;

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
    <>
      <Header />
      <div style={{ margin: '30px' }}>
        <div className="msgs">
          <h2 style={{ textAlign: 'center' }}>Welcome {userAuth.user_name}!!</h2>
          {messages.map(({ id, text, userName, uid }) => (
            <div>
              <div
                key={id}
                className={`msg ${uid === userid ? 'sent' : 'received'}`}
              >
                <b>{userName}:</b> {text}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "30px" }}>
          <SendMessage scroll={scroll} collectionName={collectionName} />
        </div>
        <div ref={scroll}></div>
      </div>
    </>
  );
}

export default Chat;