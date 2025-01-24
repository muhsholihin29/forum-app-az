import { receiveThreadsActionCreator } from '../threads/action.js';
import { receiveUsersActionCreator } from '../users/action.js';
import api from '../../utils/api.js';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndThreads };
