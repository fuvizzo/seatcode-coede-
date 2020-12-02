/* eslint-disable import/prefer-default-export */
import { ThunkDispatch } from 'redux-thunk';
import { Action, CombinedState } from 'redux';
import UIActions from '../ui/actions';
import { RootState } from '..';

export const buildRequestAndDispatchAction = (
  callBack:Function,
  dispatch: ThunkDispatch<CombinedState<RootState>, unknown, Action<string>>,
  skipLoading:boolean = false,
) => {
  try {
    if (!skipLoading) {
      dispatch(UIActions.toggleLoadingSpinner());
    }
    callBack();
    dispatch(UIActions.toggleLoadingSpinner());
  } catch (error) {
    console.log(error);
  }
};
