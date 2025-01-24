import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ThreadCommentInput({ commentThread }) {
  const [content, setContent] = useState('');
  const navigate = useNavigate('/');

  function commentThreadHandler() {
    if (content.trim()) {
      commentThread(content);
      setContent('');
      navigate('/');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setContent(target.value);
    }
  }

  return (
    <div className="thread-reply-input">
      <textarea type="text" placeholder="Type your reply" value={content} onChange={handleTextChange} />
      <p className="thread-reply-input__char-left">
        <strong>{content.length}</strong>
        /320
      </p>
      <button type="submit" onClick={commentThreadHandler}>Comment</button>
    </div>
  );
}

ThreadCommentInput.propTypes = {
  commentThread: PropTypes.func.isRequired,
};

export default ThreadCommentInput;
