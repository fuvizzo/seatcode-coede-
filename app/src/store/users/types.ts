import { Patch } from 'immer';
import * as UserActions from './constants';

export interface IUserData {
  name: string
  username: string
  email: string
  age: number
  enabled: boolean
  supervisedBy?: string
}

export interface IUser {
  id: string
  data: IUserData
}

export interface ISort {
  column: string
  direction: 'ascending' | 'descending' | undefined
}

export type IUserHash = { [id: string]: IUserData };

export interface IUserList {
  users: IUserHash
  sort: ISort
}

interface GetUsers {
  type: typeof UserActions.GET_USERS
  payload: IUserHash
}

interface CreateUser {
  type: typeof UserActions.CREATE_USER
  payload: IUser
}

interface DeleteUser {
  type: typeof UserActions.DELETE_USER
  payload: {
    userId: string
  }
}

interface UpdateUser {
  type: typeof UserActions.UPDATE_USER
  payload: IUser
}

interface SortUserBy {
  type: typeof UserActions.SORT_USER_BY
  column: string
  payload: IUserHash
}

interface GetFilterdUsers {
  type: typeof UserActions.GET_FILTERED_USERS
  payload: IUserHash
}

interface ToggleSupervisedBy {
  type: typeof UserActions.TOGGLE_SUPERVISED_BY
  payload: {
    currentUserId: string
    userId: string
  }
}

export interface ApplyPatchesActionType {
  type: typeof UserActions.APPLY_PATCHES
  payload: Patch[]
}

export type UserListActionTypes = GetUsers
  | CreateUser
  | DeleteUser
  | UpdateUser
  | SortUserBy
  | ToggleSupervisedBy
  | GetFilterdUsers
