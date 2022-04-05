import React, { useState, useContext } from 'react';
import { Fire } from './firebasee';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Input, Button } from '@material-ui/core';
import Store from '../../store/Store';

const image =
  'https://lh3.googleusercontent.com/-JVpfmGGJuO8/AAAAAAAAAAI/AAAAAAAAAME/sMJVq9F8gec/photo.jpg';

function SendMessage({ scroll, collectionName }) {
  const [msg, setMsg] = useState('');
  const [userAuth, setUserAuth] = useContext(Store);
  const userid = userAuth.user_id;
  async function sendMessage(e) {
    e.preventDefault();
    const uid = userid;
    const userName = userAuth.user_name;

    await Fire.collection(`${collectionName}`).add({
      text: msg,
      userName,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <Input
            style={{
              width: '78%',
              fontSize: '15px',
              fontWeight: '550',
              marginLeft: '5px',
              marginBottom: '-3px',
            }}
            placeholder="Message..."
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />

          <Button
            style={{ backgroundColor: 'green', marginLeft: '20px' }}
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMessage;
