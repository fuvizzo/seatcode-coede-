import axios, { AxiosResponse } from 'axios';
import UserListActions from './actions';
import { AppThunk } from '..';
import { IUser } from './types';
import { buildRequestAndDispatchAction } from '../helpers';

const URL: string = 'http://localhost:3004';

const getUsers = (): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const results: AxiosResponse<any> = await axios.get(`${URL}/users`);
    const users: IUser[] = results.data;
    dispatch(UserListActions.getUsers(users));
  }, dispatch);
};

const deleteUser = (userId: number): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    await axios.delete(`${URL}/users/${userId}`);
    dispatch(UserListActions.deleteUser(userId));
  }, dispatch);
};

const updateUser = (user: IUser): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    await axios.put(`${URL}/users/${user.id}`, user);
    dispatch(UserListActions.updateUser(user));
  }, dispatch);
};

const toggleSupervisedBy = (userId: number)
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
    const user = { ...users[userId], supervisedBy: currentUserId };
    await axios.put(`${URL}/users/${user.id}`, user);
    dispatch(UserListActions.toggleSupervisedBy(currentUserId, userId));
  }, dispatch);
};

const createUser = (user: IUser): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const res = await axios.post(`${URL}/users`, user);
    const newUser: IUser = { ...user, id: res.data.id };
    dispatch(UserListActions.createUser(newUser));
  }, dispatch);
};

const getFilteredUsers = (): AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const { query } = getState().ui.search;
    const results: AxiosResponse<any> = await axios.get(`${URL}/users?q=${query}`);
    const users: IUser[] = results.data;
    dispatch(UserListActions.getFilteredUsers(users));
  }, dispatch, true);
};

const sortUserBy = (column: string): AppThunk => async (dispatch, getState) => {
  buildRequestAndDispatchAction(async () => {
    const sortingOrder = getState().userList.sort.direction === 'ascending' ? 'asc' : 'desc';
    const results: AxiosResponse<any> = await axios.get(`${URL}/users?_sort=${column}&_order=${sortingOrder}`);
    const users: IUser[] = results.data;
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
