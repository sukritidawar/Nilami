import React, { useState, useContext } from 'react';
import { Fire } from '../../auction/chatApp/firebasee';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Store from '../../store/Store';
import { Button, Grid } from '@mui/material'

const Comments = ({ scroll, collectionName }) => {
  //const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [userAuth, setUserAuth] = useContext(Store);
  const userid = userAuth.user_id;
  const postComment = async (event) => {
    event.preventDefault();
    // backend part will come here

    const uid = userid;
    const userName = userAuth.user_name;
    await Fire.collection(`${collectionName}`).add({
      //Fire.collection(`${collectionName}`).add({
      text: comment,
      userName,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    scroll.current.scrollIntoView({ behavior: 'smooth' });
    setComment('');
  };

  return (
    <Grid className="comments" style={{ aligncontent: 'center', }}>
      <form className="commentBox">
        <Grid conatiner>
          <input
            item xs={12}
            className="input"
            type="text"
            placeholder="Write something..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            item xs={12}
            variant="outlined"
            disabled={!comment}
            className="postComment"
            type="submit"
            onClick={postComment}
          >
            Post
        </Button>
        </Grid>
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
    </Grid>
  );
};

export default Comments;
