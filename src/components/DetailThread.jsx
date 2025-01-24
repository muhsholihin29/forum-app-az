import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

function DetailThread({
  id, title, category, body, createdAt, upVotesBy, downVotesBy, owner, authUser, upVoteThread, downVoteThread, neutralVoteThread,
}) {
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  const handleUpVote = () => {
    if (isThreadUpVoted) {
      neutralVoteThread(id);
    } else {
      upVoteThread(id);
    }
  };

  const handleDownVote = () => {
    if (isThreadDownVoted) {
      neutralVoteThread(id);
    } else {
      downVoteThread(id);
    }
  };

  return (
    <section className="thread-detail">
      <header>
        <img src={owner.avatar} alt={owner.name} />
        <div className="thread-detail__user-info">
          <p className="thread-detail__user-name">{owner.name}</p>
          <p className="thread-detail__user-id">
              @
            {owner.id}
          </p>
        </div>
      </header>
      <article>
        <h2 className="thread-detail__title">{title}</h2>
        <p className="thread-detail__category">Category: {category}</p>
        <div
          className="thread-item__body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </article>
      <footer>
        <div className="thread-detail__votes">
          <button type="button" aria-label="upvote" onClick={handleUpVote}>
            { isThreadUpVoted ? <FaThumbsUp  style={{ color: 'green' }} /> : <FaThumbsUp  /> }
          </button>
          <span>
            {upVotesBy.length}
            {' '}
              Like
          </span>
        </div>
        <div className="thread-detail__votes">
          <button type="button" aria-label="downvote" onClick={handleDownVote}>
            { isThreadDownVoted ? <FaThumbsDown  style={{ color: 'red' }} /> : <FaThumbsDown  /> }
          </button>
          <span>
            {downVotesBy.length}
            {' '}
              Dislike
          </span>
        </div>
        <p className="thread-detail__created-at">{postedAt(createdAt)}</p>
      </footer>
    </section>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

DetailThread.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
  neutralVoteThread: PropTypes.func.isRequired,
};


export default DetailThread;
