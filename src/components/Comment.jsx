import React from 'react';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

function Comment({ id, content, createdAt, owner, upVotesBy, downVotesBy, authUser, upVoteComment, downVoteComment, neutralVoteComment }) {
  const isCommentUpVoted = upVotesBy.includes(authUser);
  const isCommentDownVoted = downVotesBy.includes(authUser);

  const handleUpVote = () => {
    if (isCommentUpVoted) {
      neutralVoteComment(id);
    } else {
      upVoteComment(id);
    }
  };

  const handleDownVote = () => {
    if (isCommentDownVoted) {
      neutralVoteComment(id);
    } else {
      downVoteComment(id);
    }
  };

  return (
    <div className="comment-item">
      <header className="comment-item__header">
        <div className="comment-item__owner-info">
          <img src={owner.avatar} alt={owner.name} />
          <p>{owner.name}</p>
        </div>
        <p className="posted-at">{new Date(createdAt).toLocaleDateString()}</p>
      </header>
      <p className="comment-item__content">{content}</p>
      <footer className="comment-item__footer">
        <button type="button" className="comment-upvote__button" onClick={handleUpVote}>
          <FaThumbsUp color={isCommentUpVoted ? 'green' : 'gray'} />
          <span className="comment-upvote__label">{upVotesBy.length}</span>
        </button>
        <button type="button" className="comment-downvote__button" onClick={handleDownVote}>
          <FaThumbsDown color={isCommentDownVoted ? 'red' : 'gray'} />
          <span className="comment-downvote__label">{downVotesBy.length}</span>
        </button>
      </footer>
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
  neutralVoteComment: PropTypes.func.isRequired,
};

export default Comment;
