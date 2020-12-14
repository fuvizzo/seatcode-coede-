import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import UserListActions from './actions';
import { AppThunk } from '..';
import { IUser, IUserHash } from './types';
import { buildRequestAndDispatchAction } from '../helpers';

const URL: string = 'http://localhost:3004';

const getUsers = (): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const response: AxiosResponse<any> = await axios.get(`${URL}/users`);
    const users: IUserHash = response.data;
    dispatch(UserListActions.getUsers(users));
  }, dispatch);
};

const deleteUser = (userId: string): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    await axios.delete(`${URL}/users/${userId}`);
    dispatch(UserListActions.deleteUser(userId));
  }, dispatch);
};

const updateUser = (user:IUser): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    await axios.patch(`${URL}/users`, { [user.id]: user.data });
    dispatch(UserListActions.updateUser(user));
  }, dispatch);
};

const toggleSupervisedBy = (userId: string)
  : AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const {
      userList: {
        users,
      },
      currentUser: {
        id: currentUserId,
      },
    } = getState();
    const user = { ...users[userId] };
    if (user) {
      let data;
      if (user.supervisedBy === currentUserId) {
        delete user.supervisedBy;
        data = user;
      } else {
        data = {
          ...user,
          supervisedBy: currentUserId,
        };
      }

      await axios.patch(`${URL}/users`, { [userId]: data });
      dispatch(UserListActions.toggleSupervisedBy(currentUserId, userId));
    }
  }, dispatch);
};

const createUser = (user: IUser): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const userId = uuidv4();
    await axios.patch(`${URL}/users`, { [userId]: user.data });
    const newUser: IUser = { ...user, id: userId };
    dispatch(UserListActions.createUser(newUser));
  }, dispatch);
};

const getFilteredUsers = (): AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const { query } = getState().ui.search;
    const results: AxiosResponse<any> = await axios.get(`${URL}/users?q=${query}`);
    const users: IUserHash = results.data;
    dispatch(UserListActions.getFilteredUsers(users));
  }, dispatch, true);
};

const sortUserBy = (column: string): AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const sortingOrder = getState().userList.sort.direction === 'ascending' ? 'asc' : 'desc';
    const results: AxiosResponse<any> = await axios.get(`${URL}/users?_sort=${column}&_order=${sortingOrder}`);
    const users: IUserHash = results.data;
    dispatch(UserListActions.sortUserBy(column, users));
  }, dispatch);
};

export {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
  sortUserBy,
  getFilteredUsers,
  toggleSupervisedBy,
};
