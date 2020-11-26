import axios, { AxiosResponse } from 'axios';
import UserActions from './actions';
import { AppThunk } from '..';
import { IUser } from './types';

const URL: string = 'http://localhost:3004';

export const getUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(UserActions.setLoading());
    const results: AxiosResponse<any> = await axios.get(`${URL}/users`);
    const users: IUser[] = results.data;

    dispatch(UserActions.getUsers(users));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (userId: number): AppThunk => async (dispatch) => {
  try {
    dispatch(UserActions.setLoading());
    await axios.delete(`${URL}/users/${userId}`);
    dispatch(UserActions.deleteUser(userId));
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (user: IUser): AppThunk => async (dispatch) => {
  try {
    dispatch(UserActions.setLoading());
    await axios.put(`${URL}/users/${user.id}`, user);
    dispatch(UserActions.updateUser(user));
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (user: IUser): AppThunk => async (dispatch) => {
  try {
    dispatch(UserActions.setLoading());
    const res = await axios.post(`${URL}/users`, user);
    const newUser:IUser = { ...user, id: res.data.id };
    dispatch(UserActions.createUser(newUser));
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    const { query } = getState().userList.search;
    const results: AxiosResponse<any> = await axios.get(`${URL}/users?q=${query}`);
    const users: IUser[] = results.data;
    dispatch(UserActions.getFilteredUsers(users));
  } catch (error) {
    console.log(error);
  }
};

export const sortUserBy = (column:string): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(UserActions.setLoading());
    const sortingOrder = getState().userList.sort.direction === 'ascending' ? 'asc' : 'desc';
    const results: AxiosResponse<any> = await axios.get(`${URL}/users?_sort=${column}&_order=${sortingOrder}`);
    const users: IUser[] = results.data;
    dispatch(UserActions.sortUserBy(column, users));
  } catch (error) {
    console.log(error);
  }
};
