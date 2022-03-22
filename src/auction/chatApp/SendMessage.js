import React, { useState,useContext } from 'react'
import { Fire } from './firebasee'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import firebase from 'firebase'
import { Input, Button } from '@material-ui/core'
import Store from "../../store/Store"

const image = "https://lh3.googleusercontent.com/-JVpfmGGJuO8/AAAAAAAAAAI/AAAAAAAAAME/sMJVq9F8gec/photo.jpg"

function SendMessage({ scroll, collectionName }) {
    const [msg, setMsg] = useState('')
    const [userAuth, setUserAuth] = useContext(Store);  
    // const userid = userAuth.user_id;
    const userid = "66f63f1d-9303-4e29-abba-c58be203c270"
    async function sendMessage(e) {
        e.preventDefault()
        //user id // photourl
        const uid = userid;
        const photoURL = image;

        //messages - auction id + auctioneer id
        await Fire.collection(`${collectionName}`).add({
            text: `${userAuth.user_name}: ` + msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input
                        style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }}
                        placeholder='Message...'
                        type="text"
                        value={msg}
                        onChange={e => setMsg(e.target.value)}

                    />

                    <Button
                        style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px' }}
                        type="submit">Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage