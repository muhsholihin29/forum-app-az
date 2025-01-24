import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.detailThread;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT_THREAD:
    return {
      ...detailThread,
      comments: [...detailThread.comments, action.payload.comment]
    };
  case ActionType.UP_VOTE_THREAD_DETAIL:
    return {
      ...detailThread,
      upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
        ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
        : detailThread.upVotesBy.concat(action.payload.userId),
      downVotesBy: detailThread.downVotesBy.filter((id) => id !== action.payload.userId),
    };
  case ActionType.DOWN_VOTE_THREAD_DETAIL:
    return {
      ...detailThread,
      upVotesBy: detailThread.upVotesBy.filter((id) => id !== action.payload.userId),
      downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
        ? detailThread.downVotesBy.filter((id) => id !== action.payload.userId)
        : detailThread.downVotesBy.concat(action.payload.userId),
    };
  case ActionType.NEUTRAL_VOTE_THREAD_DETAIL:
    return {
      ...detailThread,
      upVotesBy: detailThread.upVotesBy.filter((id) => id !== action.payload.userId),
      downVotesBy: detailThread.downVotesBy.filter((id) => id !== action.payload.userId),
    };
  default:
    return detailThread;
  }
}

export default detailThreadReducer;
