import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

function CommentList({ comments, upVoteComment, downVoteComment, neutralVoteComment }) {
  return (
    <div className="thread-comment__list">
      <h3>Komentar ({comments.length})</h3>
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            upVoteComment={upVoteComment}
            downVoteComment={downVoteComment}
            neutralVoteComment={neutralVoteComment}
          />
        ))}
      </div>
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  upVoteComment: PropTypes.func,
  downVoteComment: PropTypes.func,
  neutralVoteComment: PropTypes.func,
};

export default CommentList;
