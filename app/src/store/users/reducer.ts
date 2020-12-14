/* eslint-disable default-case */
import {
  Patch,
  produce,
  produceWithPatches,
  enablePatches,
  applyPatches,
} from 'immer';

import { Reducer } from 'redux';

import {
  IUserList,
  ApplyPatchesActionType,
  UserListActionTypes,
} from './types';
import webSocketHanlder, { IWebSocketHandler } from '../../common/web-socket';
import * as UserActions from './constants';

export const initialState: IUserList = {
  users: {},
  sort: {
    column: 'name',
    direction: 'ascending',
  },
};

const wsHandler: IWebSocketHandler = webSocketHanlder.getInstance();

enablePatches();

const recipe = (draft: IUserList, action: UserListActionTypes): void => {
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
      draft.users[action.payload.id] = action.payload.data;
      break;
    case UserActions.DELETE_USER:
      delete draft.users[action.payload.userId];
      break;
    case UserActions.UPDATE_USER: {
      const userId = Object.keys(draft.users).find((key) => key === action.payload.id);
      if (userId) {
        draft.users[userId] = action.payload.data;
      }
      break;
    }
    case UserActions.TOGGLE_SUPERVISED_BY: {
      const user = draft.users[action.payload.userId];
      if (user) {
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
};

export const UserListReducer: Reducer<IUserList, UserListActionTypes> = produce(
  recipe,
  initialState,
);

const PatchesUserListReducer: Reducer<IUserList, UserListActionTypes | ApplyPatchesActionType> = (
  state: IUserList = initialState,
  action: UserListActionTypes | ApplyPatchesActionType,
) => {
  if (action.type === UserActions.APPLY_PATCHES) {
    return applyPatches(state, action.payload);
  }
  const [newState, patches]: [IUserList, Patch[], Patch[]] = (
    produceWithPatches(recipe,
      initialState)
  )(state, action);

  if (patches.length !== 0) {
    wsHandler.sendMessage(JSON.stringify({ userList: patches }));
  }
  return newState;
};

export default PatchesUserListReducer;
