import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  function mAddThread() {
    if (title.trim() && category.trim() && body.trim()) {
      addThread({ title, category, body });
      setTitle('');
      setCategory('');
      setBody('');
    }
  }

  function handleBodyChange({ target }) {
    if (target.value.length <= 320) {
      setBody(target.value);
    }
  }

  return (
    <div className="thread-input">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}/>
      <textarea placeholder="What are you thinking?" value={body} onChange={handleBodyChange}/>
      <p className="thread-input__char-left">
        <strong>{body.length}</strong>/320
      </p>
      <button type="submit" onClick={mAddThread}>Thread</button>
    </div>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
