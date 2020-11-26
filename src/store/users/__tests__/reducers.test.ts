import reducer, { initialState } from '../reducers';
import * as UserActions from '../constants';
import jsonData from '../../../../mock/db.json';

import { IUser, IUserList, UserListActionTypes } from '../types';

const fakeUser:IUser = {
  username: 'xyz',
  name: 'Foo foo',
  email: 'foo@foo.foo',
  id: 123,
  age: 30,
};

describe('UserList reducer', () => {
  /* it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  }); */

  it('should handle GET_USERS', () => {
    const userList:IUserList = {
      ...initialState,
      users: jsonData.users,
    };
    const action:UserListActionTypes = {
      type: UserActions.GET_USERS,
      payload: jsonData.users,
    };
    expect(
      reducer(initialState, action),
    ).toEqual(userList);
  });

  it('should handle CREATE_USER', () => {
    const userList:IUserList = {
      ...initialState,
      users: [fakeUser],
    };
    const action:UserListActionTypes = {
      type: UserActions.CREATE_USER,
      payload: fakeUser,
    };
    expect(
      reducer(initialState, action),
    ).toEqual(userList);
  });

  it('should handle DELETE_USER', () => {
    const action:UserListActionTypes = {
      type: UserActions.DELETE_USER,
      meta: { id: fakeUser.id },
    };
    expect(
      reducer(initialState, action),
    ).toEqual(initialState);
  });

  it('should handle UPDATE_USER', () => {
    const userList:IUserList = {
      ...initialState,
      users: [fakeUser],
    };
    const action:UserListActionTypes = {
      type: UserActions.UPDATE_USER,
      payload: {
        username: 'xyz_boo',
        name: 'Foo Boo',
        email: 'boo@foo.foo',
        id: 123,
        age: 30,
      },
    };
    const state = reducer(userList, action);
    expect(state.users[0].name).toEqual('Foo Boo');
  });
});
