import React, { useState, useContext } from 'react'
import { Fire } from "../../auction/chatApp/firebasee"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Store from "../../store/Store"

const Comments = ({ scroll, collectionName }) => {
  //const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [userAuth, setUserAuth] = useContext(Store);
  const userid = userAuth.user_id;
  const postComment =  async (event) => {
    event.preventDefault();
    // backend part will come here

    const uid = userid;
    const userName = userAuth.user_name;
    await Fire.collection(`${collectionName}`).add({
      //Fire.collection(`${collectionName}`).add({
      text: comment,
      userName,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    scroll.current.scrollIntoView({ behavior: 'smooth' })
    setComment('');
  };

  return (
    <div className="comments">
      <form className="commentBox">
        <input
          className="input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          disabled={!comment}
          className="postComment"
          type="submit"
          onClick={postComment}
        >
          Comment
        </button>
      </form>
      {/* <div className="postComments">
        <p>
          <strong>x1</strong> 123
        </p>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div> */}
    </div>
  );
};

export default Comments;
