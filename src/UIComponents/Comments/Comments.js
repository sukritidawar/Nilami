import React, { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const postComment = (event) => {
    event.preventDefault();
    // backend part will come here
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
      <div className="postComments">
        <p>
          <strong>x1</strong> 123
        </p>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Comments;
