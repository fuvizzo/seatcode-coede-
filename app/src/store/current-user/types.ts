import * as CurrentUserActions from './constants';

export interface ICurrentUser {
  id: string
  name: string
}

interface GetData {
  type: typeof CurrentUserActions.GET_DATA
  payload: ICurrentUser
}

export type CurrentUserActionTypes = GetData;
