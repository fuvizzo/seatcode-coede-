import reducer, { initialState } from '../reducer';
import * as UserActions from '../constants';
import jsonData from '../../../../mock/db.json';

import { ICurrentUser, CurrentUserActionTypes } from '../types';

const fakeUser: ICurrentUser = {
  name: 'Foo foo',
  id: 123,
};

describe('CurrentUser reducer', () => {
  describe('should handle GET_DATA', () => {
    it('retrieves the current user data', () => {
      const action: CurrentUserActionTypes = {
        type: UserActions.GET_DATA,
        payload: fakeUser,
      };

      expect(
        reducer(initialState, action),
      ).toEqual(fakeUser);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(
        initialState.id,
      ).toEqual(0);
    });
  });
});
