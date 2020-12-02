/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from 'axios';
import * as CurrentUserListActions from './actions';
import { buildRequestAndDispatchAction } from '../helpers';
import { AppThunk } from '..';
import { ICurrentUser } from './types';

const URL: string = 'http://localhost:3004';

export const getCurrentUser = (userId:number): AppThunk => async (dispatch) => {
  buildRequestAndDispatchAction(async () => {
    const results: AxiosResponse<any> = await axios.get(`${URL}/supervisors/${userId}`);
    const user: ICurrentUser = results.data;
    dispatch(CurrentUserListActions.getData(user));
  }, dispatch);
};
