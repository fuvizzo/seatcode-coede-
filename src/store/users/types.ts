import * as UserActions from './constants';

export interface IUser {
  id: number
  name: string
  username: string
  email: string
}

export interface ISort {
  column: string
  direction: string
}

export interface IUserList {
  users: IUser[]
  sort: ISort
}

interface GetUsers {
  type: typeof UserActions.GET_USERS
  payload: IUser[]
}

interface CreateUser {
  type: typeof UserActions.CREATE_USER
  payload: IUser
}

interface DeleteUser {
  type: typeof UserActions.DELETE_USER
  meta: {
    id: number
  }
}

interface UpdateUser {
  type: typeof UserActions.UPDATE_USER
  payload: IUser
}

interface SortUserBy {
  type: typeof UserActions.SORT_USER_BY
  sort: ISort
}

export type UserListActionTypes = GetUsers | CreateUser | DeleteUser | UpdateUser | SortUserBy