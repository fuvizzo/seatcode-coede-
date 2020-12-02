import * as UserActions from './constants';

export interface IUser {
  id: number
  name: string
  username: string
  email: string
  age: number
  enabled: boolean
  supervisedBy?: number
}

export interface ISort {
  column: string
  direction: 'ascending' | 'descending' | undefined
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
  payload: {
    userId: number
  }
}

interface UpdateUser {
  type: typeof UserActions.UPDATE_USER
  payload: IUser
}

interface SortUserBy {
  type: typeof UserActions.SORT_USER_BY
  column: string
  payload: IUser[]
}

interface GetFilterdUsers {
  type: typeof UserActions.GET_FILTERED_USERS
  payload: IUser[]
}

export type UserListActionTypes = GetUsers
  | CreateUser
  | DeleteUser
  | UpdateUser
  | SortUserBy
  | GetFilterdUsers;
