import reducer, { initialState } from '../reducer';
import * as UserActions from '../constants';
import jsonData from '../../../../mock/db.json';

import { IUser, IUserList, UserListActionTypes } from '../types';

const fakeUser: IUser = {
  username: 'xyz',
  name: 'Foo foo',
  email: 'foo@foo.foo',
  id: 123,
  age: 30,
  enabled: false,
};

describe('UserList reducer', () => {
  describe('should handle GET_USERS', () => {
    const userList: IUserList = {
      ...initialState,
      users: jsonData.users,
    };
    it('retrieves the user list', () => {
      const action: UserListActionTypes = {
        type: UserActions.GET_USERS,
        payload: jsonData.users,
      };
      expect(
        reducer(initialState, action),
      ).toEqual(userList);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(
        initialState.users.length,
      ).toEqual(0);
    });
  });

  describe('should handle CREATE_USER', () => {
    const userList: IUserList = {
      ...initialState,
      users: [fakeUser],
    };

    it('creates a new user', () => {
      const action: UserListActionTypes = {
        type: UserActions.CREATE_USER,
        payload: fakeUser,
      };
      expect(
        reducer(initialState, action),
      ).toEqual(userList);
    });
  });

  describe('should handle DELETE_USER', () => {
    const action: UserListActionTypes = {
      type: UserActions.DELETE_USER,
      payload: { userId: fakeUser.id },
    };

    it('deletes an existing user', () => {
      expect(
        reducer(initialState, action),
      ).toEqual(initialState);
    });
  });

  describe('should handle UPDATE_USER', () => {
    const userList: IUserList = {
      ...initialState,
      users: [fakeUser],
    };

    it('updates an existing user', () => {
      const action: UserListActionTypes = {
        type: UserActions.UPDATE_USER,
        payload: {
          username: 'xyz_boo',
          name: 'Foo Boo',
          email: 'boo@foo.foo',
          id: 123,
          age: 30,
          enabled: false,
          supervisedBy: undefined,
        },
      };
      const state = reducer(userList, action);
      expect(state.users[0].name).toEqual('Foo Boo');
    });
  });
});
