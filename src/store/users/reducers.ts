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
    case UserActions.LOADING:
      return {
        ...state,
        loading: true,
      };
    case UserActions.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case UserActions.SORT_USER_BY:
      return {
        ...state,
        loading: false,
        sort: {
          column: action.column,
          direction: state.sort.direction === 'ascending' ? 'descending' : 'ascending',
        },
        users: action.payload,
      };
    case UserActions.TRIGGER_USER_SEARCH:
      return {
        ...state,
        loading: true,
        search: { query: action.query },
      };
    case UserActions.GET_FILTERD_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case UserActions.CREATE_USER:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };
    case UserActions.DELETE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.filter(
          (user) => user.id !== action.meta.id,
        ),
      };
    case UserActions.UPDATE_USER:
      return {
        ...state,
        loading: false,
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
