import reducer, { initialState } from '../reducer';
import * as UserActions from '../constants';
import jsonData from '../../../../mock/db.json';

import { IUI, UIActionTypes } from '../types';

/* const fakeUser: ICurrentUser = {
  name: 'Foo foo',
  id: 123,
}; */

describe('UI reducer', () => {
  describe('should handle LOADING', () => {
    it('set the loader', () => {
      const action: UIActionTypes = {
        type: UserActions.LOADING,
      };

      expect(
        reducer(initialState, action).loading,
      ).toEqual(true);
    });

    it('doesn\'t modifiy the orginal state', () => {
      expect(
        initialState.loading,
      ).toEqual(false);
    });
  });
});
