import React, { useState, useEffect, useRef, useContext } from 'react';
import { Fire } from '../chatApp/firebasee';
import Comments from '../Comments/Comments';
import { useParams, useLocation } from 'react-router-dom';
import Store from '../../store/Store';

const AuctionnerAnnouncement = () => {
  const scroll = useRef();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [userAuth, setUserAuth] = useContext(Store);
  const auctionDetails = useLocation().state;
  console.log(auctionDetails);
  const auctionId = id;
  const collectionName = 'Announcements_' + auctionId;
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
    <div style={{ margin: '30px' }}>
      <div className="msgs">
        <h2 style={{ textAlign: 'center' }}>Announcements</h2>
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
      <Comments scroll={scroll} collectionName={collectionName} />
      <div ref={scroll}></div>
    </div>
  );
};

export default AuctionnerAnnouncement;
