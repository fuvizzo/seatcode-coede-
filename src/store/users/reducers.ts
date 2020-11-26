import {
  IUserList,
  UserListActionTypes

} from './types';
import _ from 'lodash';
import * as UserActions from './constants';


const initialState: IUserList = {
  users: [],
  sort: {
    column: "name",
    direction: "ascending"
  }
}

export function UserListReducer(
  state = initialState,
  action: UserListActionTypes
): IUserList {
  switch (action.type) {
    case UserActions.GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case UserActions.SORT_USER_BY:
      if (state.sort.column === action.column) {
        return {
          sort: {
            direction:
              state.sort.direction === 'ascending' ? 'descending' : 'ascending',
            column: action.column
          },
          users: state.users.reverse(),
        }
      }

      return {
        sort: {
          column: action.column,
          direction: 'ascending',
        },
        users: _.sortBy(state.users, [action.column]),
      }
    case UserActions.CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case UserActions.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(
          user => user.id !== action.meta.id
        )
      }
    case UserActions.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id !== action.payload.id) {
            return user
          }
          return {
            ...user,
            ...action.payload
          }
        })
      }
    default:
      return state
  }
}