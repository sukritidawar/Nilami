import React, { useState, useEffect, useRef ,useContext} from 'react'
import { Fire } from './firebasee'
import SendMessage from './SendMessage'
import {useParams , useLocation} from 'react-router-dom';
import Store from "../../store/Store"

function Chat() {
    const scroll = useRef()
    const { id } = useParams();
    const [messages, setMessages] = useState([])
    const [userAuth, setUserAuth] = useContext(Store);  
    const auctionDetails = useLocation().state;
    console.log(auctionDetails);
    const auctionId = id;
    const auctioneerID = auctionDetails.auctioneerUserName;
    const winnerId = auctionDetails.winnerid;
    const collectionName = auctionId +"_" + auctioneerID +"_" + winnerId;
    useEffect(() => {
        // auction id + auctioneer id + winner id;
        Fire.collection({collectionName}).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    
    // const userid = userAuth.user_id;
    const userid = "66f63f1d-9303-4e29-abba-c58be203c270";
    
    return (
        <div>
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        
                        <div key={id} className={`msg ${uid === userid ? 'sent' : 'received'}`}>
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} collectionName = {collectionName}/>
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat