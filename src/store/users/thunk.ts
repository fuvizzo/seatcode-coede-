import { Action } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk';
import {
  CRUDActions,
} from './actions';
import { RootState } from '..';
import { IUser } from './types';

const {
  getUsers: getUserActions,
  deleteUser: deleteUserAction,
  updateUser: updateUserAction,
  createUser: createUserAction,
} = CRUDActions;

const URL: string = 'http://localhost:3004';

export const getUsers = ():
ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const results: AxiosResponse<any> = await axios.get(`${URL}/users`);
    const users: IUser[] = results.data;
    dispatch(
      getUserActions(users),
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (userId: number):
ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    await axios.delete(`${URL}/users/${userId}`);
    dispatch(
      deleteUserAction(userId),
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (user: IUser):
 ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    await axios.put(`${URL}/users/${user.id}`, user);
    dispatch(
      updateUserAction(user),
    );
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (user: IUser):
 ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const res = await axios.post(`${URL}/users`, user);
    const newUser:IUser = { ...user, id: res.data.id };
    dispatch(
      createUserAction(newUser),
    );
  } catch (error) {
    console.log(error);
  }
};
