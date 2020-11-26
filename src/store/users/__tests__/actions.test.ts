import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import UserActions from '../actions';
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../constants';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../thunk';
import { IUser, UserListActionTypes } from '../types';
import jsonData from '../../../../mock/db.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const users:any = jsonData;
const store = mockStore({ users });
const baseUrl = 'http://localhost:3004';
const fakeUser:IUser = {
  username: 'xyz',
  name: 'Foo foo',
  email: 'foo@foo.foo',
  id: 123,
};

describe('actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should create an action to get user list', () => {
    moxios.stubRequest(`${baseUrl}/users`, {
      status: 200,
      response: {
        data: {
          users,
        },
      },
    });

    const expectedAction:UserListActionTypes = {
      type: GET_USERS,
      payload: users,
    };

    return store.dispatch<any>(getUsers()).then(() => {
      expect(UserActions.getUsers(users)).toEqual(expectedAction);
    });
  });

  it('should create an action to add a new user', () => {
    moxios.stubRequest(`${baseUrl}/users`, {
      status: 200,
      response: {
        data: {
          fakeUser,
        },
      },
    });

    const expectedAction:UserListActionTypes = {
      type: CREATE_USER,
      payload: fakeUser,
    };

    return store.dispatch<any>(createUser(fakeUser)).then(() => {
      expect(UserActions.createUser(fakeUser)).toEqual(expectedAction);
    });
  });

  it('should create an action to edit an user', () => {
    moxios.stubRequest(`${baseUrl}/users/123`, {
      status: 200,
      response: { },
    });

    const expectedAction:UserListActionTypes = {
      type: UPDATE_USER,
      payload: fakeUser,
    };

    return store.dispatch<any>(updateUser(fakeUser)).then(() => {
      expect(UserActions.updateUser(fakeUser)).toEqual(expectedAction);
    });
  });

  /* it('should create an action to delete an user', () => {
    moxios.stubRequest(`${baseUrl}/users/123`, {
      status: 200,
      response: { },
    });

    const expectedAction:UserListActionTypes = {
      type: DELETE_USER,
      meta: {
        id: fakeUser.id,
      },
    };

    return store.dispatch<any>(deleteUser(fakeUser.id)).then(() => {
      expect(UserActions.deleteUser(fakeUser.id)).toEqual(expectedAction);
    });
  }); */
});
