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
      if (state.sort.column === action.sort.column) {
        return {
          sort: {
            direction:
              state.sort.direction === 'ascending' ? 'descending' : 'ascending',
            column: action.sort.column
          },
          users: state.users.reverse(),
        }
      }

      return {
        sort: {
          column: action.sort.column,
          direction: 'ascending',
        },
        users: _.sortBy(state.users, [action.sort.column]),
      }
    /*  case UserActions.CREATE_USER:
       return [...state, action.payload]
     case UserActions.DELETE_USER:
       return state.filter(
         user => user.id !== action.meta.id
       )
     case UserActions.UPDATE_USER:
       return state.map((user, index) => {
         if (user.id !== action.payload.id) {
           return user
         }
         return {
           ...user,
           ...action.payload
         }
       }) */
    default:
      return state
  }
}