import axios, { AxiosResponse } from 'axios';
import UserListActions from './actions';
import UIActions from '../ui/actions';
import { AppThunk } from '..';
import { IUser } from './types';

const URL: string = 'http://localhost:3004';

export const getUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(UIActions.toggleLoadingSpinner());
    const results: AxiosResponse<any> = await axios.get(`${URL}/users`);
    const users: IUser[] = results.data;

    dispatch(UserListActions.getUsers(users));
    dispatch(UIActions.toggleLoadingSpinner());
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (userId: number): AppThunk => async (dispatch) => {
  try {
    dispatch(UIActions.toggleLoadingSpinner());
    await axios.delete(`${URL}/users/${userId}`);
    dispatch(UserListActions.deleteUser(userId));
    dispatch(UIActions.toggleLoadingSpinner());
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (user: IUser): AppThunk => async (dispatch) => {
  try {
    dispatch(UIActions.toggleLoadingSpinner());
    await axios.put(`${URL}/users/${user.id}`, user);
    dispatch(UserListActions.updateUser(user));
    dispatch(UIActions.toggleLoadingSpinner());
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (user: IUser): AppThunk => async (dispatch) => {
  try {
    dispatch(UIActions.toggleLoadingSpinner());
    const res = await axios.post(`${URL}/users`, user);
    const newUser:IUser = { ...user, id: res.data.id };
    dispatch(UserListActions.createUser(newUser));
    dispatch(UIActions.toggleLoadingSpinner());
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    const { query } = getState().ui.search;
    const results: AxiosResponse<any> = await axios.get(`${URL}/users?q=${query}`);
    const users: IUser[] = results.data;
    dispatch(UserListActions.getFilteredUsers(users));
    dispatch(UIActions.toggleLoadingSpinner());
  } catch (error) {
    console.log(error);
  }
};

export const sortUserBy = (column:string): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(UIActions.toggleLoadingSpinner());
    const sortingOrder = getState().userList.sort.direction === 'ascending' ? 'asc' : 'desc';
    const results: AxiosResponse<any> = await axios.get(`${URL}/users?_sort=${column}&_order=${sortingOrder}`);
    const users: IUser[] = results.data;
    dispatch(UserListActions.sortUserBy(column, users));
    dispatch(UIActions.toggleLoadingSpinner());
  } catch (error) {
    console.log(error);
  }
};
