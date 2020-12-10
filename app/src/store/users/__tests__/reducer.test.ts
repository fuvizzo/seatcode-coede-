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
        },
      };
      const state = reducer(userList, action);
      expect(state.users[0].name).toEqual('Foo Boo');
    });
  });

  describe('should handle TOGGLE_SUPERVISED_BY', () => {
    it('toggles supervisedBy to some supervisor user ID', () => {
      const userList: IUserList = {
        ...initialState,
        users: [fakeUser],
      };
      const action: UserListActionTypes = {
        type: UserActions.TOGGLE_SUPERVISED_BY,
        payload: {
          currentUserId: 467,
          userId: 123,
        },
      };
      const state = reducer(userList, action);
      expect(state.users[0].supervisedBy).toEqual(467);
    });

    it('toggles supervisedBy to undefined if supervisor user ID is the same as supervisedBy value', () => {
      const userList: IUserList = {
        ...initialState,
        users: [{
          ...fakeUser,
          supervisedBy: 467,
        }],
      };
      const action: UserListActionTypes = {
        type: UserActions.TOGGLE_SUPERVISED_BY,
        payload: {
          currentUserId: 467,
          userId: 123,
        },
      };
      const state = reducer(userList, action);
      expect(state.users[0].supervisedBy).toEqual(undefined);
    });
  });
});
