import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem.jsx';

function ThreadsList({ threads, upVote, downVote, neutralVote }) {
  return (
    <div className="threads-list">
      {
        threads.map((thread) => (
          <ThreadItem key={thread.id} {...thread} upVote={upVote} downVote={downVote} neutralVote={neutralVote} />
        ))
      }
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export default ThreadsList;
