import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId: threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, category, body }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, category, body });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
};
