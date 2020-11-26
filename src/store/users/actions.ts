import { ISort, IUser, UserListActionTypes } from './types'
import * as UserActions from './constants';

export function getUsers(users: IUser[]): UserListActionTypes {
  return {
    type: UserActions.GET_USERS,
    payload: users
  }
}

export function createUser(newUser: IUser): UserListActionTypes {
  return {
    type: UserActions.CREATE_USER,
    payload: newUser
  }
}

export function deleteUser(id: number): UserListActionTypes {
  return {
    type: UserActions.DELETE_USER,
    meta: {
      id
    }
  }
}

export function updateUser(user: IUser): UserListActionTypes {
  return {
    type: UserActions.UPDATE_USER,
    payload: user
  }
}

export function sortUserBy(column: string): UserListActionTypes {
  return {
    type: UserActions.SORT_USER_BY,
    column
  }
} 
