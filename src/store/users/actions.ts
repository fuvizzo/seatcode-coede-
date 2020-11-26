import { ISort, IUser, UserListActionTypes } from './types';
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

const sortUserBy = (column:string, results:IUser[]): UserListActionTypes => ({
  type: UserActions.SORT_USER_BY,
  column,
  payload: results,
});

const searchUser = (query: string, results:IUser[]): UserListActionTypes => ({
  type: UserActions.SEARCH,
  query,
  payload: results,
});

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  sortUserBy,
};
