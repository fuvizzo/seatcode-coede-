import { IUser, UserListActionTypes } from './types';
import * as UserActions from './constants';

const getUsers = (users: IUser[]): UserListActionTypes => ({
  type: UserActions.GET_USERS,
  payload: users,
});

const createUser = (newUser: IUser): UserListActionTypes => ({
  type: UserActions.CREATE_USER,
  payload: newUser,
});

const deleteUser = (id: number): UserListActionTypes => ({
  type: UserActions.DELETE_USER,
  meta: {
    id,
  },
});

const updateUser = (user: IUser): UserListActionTypes => ({
  type: UserActions.UPDATE_USER,
  payload: user,
});

const sortUserBy = (column: string): UserListActionTypes => ({
  type: UserActions.SORT_USER_BY,
  column,
});

export const CRUDActions = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

export const UIActions = {
  sortUserBy,
};
