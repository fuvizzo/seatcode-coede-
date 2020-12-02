/* eslint-disable import/prefer-default-export */
import axios, { AxiosResponse } from 'axios';
import * as CurrentUserListActions from './actions';

import UIActions from '../ui/actions';
import { AppThunk } from '..';
import { ICurrentUser } from './types';

const URL: string = 'http://localhost:3004';

export const getCurrentUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(UIActions.toggleLoadingSpinner());
    const results: AxiosResponse<any> = await axios.get(`${URL}/currentuser`);
    const user: ICurrentUser = results.data;

    dispatch(CurrentUserListActions.getData(user));
    dispatch(UIActions.toggleLoadingSpinner());
  } catch (error) {
    console.log(error);
  }
};
