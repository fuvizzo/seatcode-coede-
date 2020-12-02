/* eslint-disable default-case */
import produce from 'immer';
import { Reducer } from 'redux';
import {
  IUserList,
  UserListActionTypes,
} from './types';

import * as UserActions from './constants';

export const initialState: IUserList = {
  users: [],
  sort: {
    column: 'name',
    direction: 'ascending',
  },
};

const UserListReducer: Reducer<IUserList, UserListActionTypes> = produce(
  (draft: IUserList, action: UserListActionTypes): void => {
    switch (action.type) {
      case UserActions.GET_USERS:
        draft.users = action.payload;
        break;
      case UserActions.SORT_USER_BY:
        draft.sort = {
          column: action.column,
          direction: draft.sort.direction === 'ascending' ? 'descending' : 'ascending',
        };
        draft.users = action.payload;
        break;
      case UserActions.GET_FILTERED_USERS:
        draft.users = action.payload;
        break;
      case UserActions.CREATE_USER:
        draft.users.push(action.payload);
        break;
      case UserActions.DELETE_USER:
        draft.users = draft.users.filter(
          (user) => user.id !== action.payload.userId,
        );
        break;
      case UserActions.UPDATE_USER: {
        const index = draft.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) draft.users[index] = action.payload;
        break;
      }
      case UserActions.TOGGLE_SUPERVISED_BY: {
        const index = draft.users.findIndex((user) => user.id === action.payload.userId);
        if (index !== -1) {
          const user = draft.users[index];
          const supervisedBy = user.supervisedBy === action.payload.currentUserId
            ? undefined
            : user.supervisedBy;
          user.supervisedBy = user.supervisedBy === undefined
            ? action.payload.currentUserId
            : supervisedBy;
        }
        break;
      }
    }
  }, initialState,
);

export default UserListReducer;
