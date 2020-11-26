import _ from 'lodash';
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
  search: {
    query: '',
  },
  loading: false,
};

const UserListReducer = (
  state = initialState,
  action: UserListActionTypes,
): IUserList => {
  switch (action.type) {
    case UserActions.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case UserActions.SORT_USER_BY:
      return {
        ...state,
        sort: {
          column: action.column,
          direction: state.sort.direction === 'ascending' ? 'descending' : 'ascending',
        },
        users: action.payload,
      };
    case UserActions.SEARCH:
      return {
        ...state,
        search: { query: action.query },
        users: action.payload,
      };
    case UserActions.CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case UserActions.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id !== action.meta.id,
        ),
      };
    case UserActions.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id !== action.payload.id) {
            return user;
          }
          return {
            ...user,
            ...action.payload,
          };
        }),
      };
    default:
      return state;
  }
};

export default UserListReducer;
