import { Patch } from 'immer';
import { IUser, IUserList, UserListActionTypes } from './types';
import * as UserActions from './constants';

const getUsers = (users: IUser[]): UserListActionTypes => ({
  type: UserActions.GET_USERS,
  payload: users,
});

const createUser = (newUser: IUser): UserListActionTypes => ({
  type: UserActions.CREATE_USER,
  payload: newUser,
});

const deleteUser = (userId: number): UserListActionTypes => ({
  type: UserActions.DELETE_USER,
  payload: {
    userId,
  },
});

const updateUser = (user: IUser): UserListActionTypes => ({
  type: UserActions.UPDATE_USER,
  payload: user,
});

const sortUserBy = (column: string, results: IUser[]): UserListActionTypes => ({
  type: UserActions.SORT_USER_BY,
  column,
  payload: results,
});

const getFilteredUsers = (results: IUser[]): UserListActionTypes => ({
  type: UserActions.GET_FILTERED_USERS,
  payload: results,
});

const toggleSupervisedBy = (currentUserId: number, userId: number): UserListActionTypes => ({
  type: UserActions.TOGGLE_SUPERVISED_BY,
  payload: {
    currentUserId,
    userId,
  },
});

export const applyPatches = (patches:Patch[]): UserListActionTypes => ({
  type: UserActions.APPLY_PATCHES,
  payload: patches,
});

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  sortUserBy,
  getFilteredUsers,
  toggleSupervisedBy,
};
