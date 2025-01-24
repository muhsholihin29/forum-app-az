import React from 'react';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';

function ThreadItem({
  id, title, category, body, createdAt, upVotesBy, downVotesBy, user, authUser, upVote, downVote, neutralVote, totalComments
}) {
  const navigate = useNavigate();
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (isThreadUpVoted) {
      neutralVote(id);
    } else {
      upVote(id);
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if (isThreadDownVoted) {
      neutralVote(id);
    } else {
      downVote(id);
    }
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div role="button" tabIndex={0} className="thread-item" onClick={onThreadClick} onKeyDown={onThreadPress}>
      <div className="thread-item__user-avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="thread-item__detail">
        <header>
          <div className="thread-item__user-info">
            <p className="thread-item__user-name">{user.name}</p>
            <p className="thread-item__user-id">@{user.id}</p>
          </div>
          <p className="thread-item__created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <h3 className="thread-item__title">{title}</h3>
          <p className="thread-item__category">{category}</p>
          <div
            className="thread-item__body"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </article>
        <div className="thread-item__actions">
          <div className="thread-item__votes">
            <p>
              <button type="button" aria-label="upvote" onClick={onUpVoteClick}>
                {isThreadUpVoted ? <FaThumbsUp style={{ color: 'green' }}/> : <FaThumbsUp/>}
              </button>
              {' '}
              {upVotesBy.length}
            </p>
            <p>
              <button type="button" aria-label="downvote" onClick={onDownVoteClick}>
                {isThreadDownVoted ? <FaThumbsDown style={{ color: 'red' }}/> : <FaThumbsDown/>}
              </button>
              {' '}
              {downVotesBy.length}
            </p>
          </div>
          <div className="thread-item__comments">
            <p>{totalComments} Komentar</p>
          </div>
        </div>

      </div>
    </div>
  );
}


const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func,
};

ThreadItem.defaultProps = {
  upVote: null,
  downVote: null,
  neutralVote: null,
};

export { threadItemShape };

export default ThreadItem;
