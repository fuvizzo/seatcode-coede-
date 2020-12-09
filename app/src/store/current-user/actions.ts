/* eslint-disable import/prefer-default-export */
import { ICurrentUser, CurrentUserActionTypes } from './types';
import * as CurrentUserActions from './constants';

export const getData = (user: ICurrentUser): CurrentUserActionTypes => ({
  type: CurrentUserActions.GET_DATA,
  payload: user,
});
