/* eslint-disable default-case */
import produce from 'immer';
import { Reducer } from 'redux';
import {
  CurrentUserActionTypes,
  ICurrentUser,
} from './types';
import * as CurrentUserActions from './constants';

export const initialState: ICurrentUser = {
  id: '',
  name: '',
};

const CurrentUserReducer: Reducer<ICurrentUser, CurrentUserActionTypes> = produce(
  (
    draft: ICurrentUser,
    action: CurrentUserActionTypes,
  ): void => {
    switch (action.type) {
      case CurrentUserActions.GET_DATA:
        draft.id = action.payload.id;
        draft.name = action.payload.name;
        break;
    }
  }, initialState,
);

export default CurrentUserReducer;
