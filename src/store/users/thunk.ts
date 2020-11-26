import { Action } from 'redux'
import {
  getUsers as getUserActions,
  deleteUser as deleteUserAction,
  updateUser as updateUserAction,
  createUser as createUserAction,
} from './actions'
import axios, { AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '..'
import { IUser } from './types';

const URL: string = "http://localhost:3004";

export const getUsers = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    const results: AxiosResponse<any> = await axios.get(`${URL}/users`);
    const users: IUser[] = results.data;
    dispatch(
      getUserActions(users)
    )
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = (userId: number): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    await axios.delete(`${URL}/users/${userId}`);
    dispatch(
      deleteUserAction(userId)
    )
  } catch (error) {

  }
}

export const updateUser = (user: IUser): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    await axios.put(`${URL}/users/${user.id}`, user);
    dispatch(
      updateUserAction(user)
    )
  } catch (error) {

  }
}

export const createUser = (user: IUser): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    await axios.post(`${URL}/users`, user);
    dispatch(
      createUserAction(user)
    )
  } catch (error) {

  }
}


