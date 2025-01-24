import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
  NEUTRAL_VOTE_THREAD_DETAIL: 'TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL',
  ADD_COMMENT_THREAD: 'ADD_COMMENT_THREAD',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function addCommentThreadActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_THREAD,
    payload: {
      comment,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearDetailThreadActionCreator());

    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteDetailThread() {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(upVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.upVoteThread(detailThread.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownVoteDetailThread() {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(downVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.downVoteThread(detailThread.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralVoteDetailThread() {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    dispatch(neutralVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.neutralVoteThread(detailThread.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddCommentThread(id, content) {
  return async (dispatch) => {
    try {
      console.log('Adding comment...');
      const comment = await api.createComment(id, content);
      // const comment = '{\n' +
      //     '  "id": "comment-fhFVQndV5dR-QYN7",\n' +
      //     '  "content": "saqa",\n' +
      //     '  "createdAt": "2025-01-21T23:49:13.057Z",\n' +
      //     '  "upVotesBy": [],\n' +
      //     '  "downVotesBy": [],\n' +
      //     '  "owner": {\n' +
      //     '    "id": "user-fNDFMLQz2aEVxanK",\n' +
      //     '    "name": "nama saya",\n' +
      //     '    "email": "sholi@gmail.com",\n' +
      //     '    "avatar": "https://ui-avatars.com/api/?name=nama saya&background=random"\n' +
      //     '  }\n' +
      //     '}'
      console.log('Comment added:', comment);
      dispatch(addCommentThreadActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  upVoteDetailThreadActionCreator,
  addCommentThreadActionCreator,
  asyncReceiveDetailThread,
  asyncUpVoteDetailThread,
  downVoteDetailThreadActionCreator,
  neutralVoteDetailThreadActionCreator,
  asyncDownVoteDetailThread,
  asyncNeutralVoteDetailThread,
  asyncAddCommentThread
};
