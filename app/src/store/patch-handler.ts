import { Patch } from 'immer';
import { Dispatch } from 'redux';
import webSocketHanlder, { IWebSocketHandler } from '../common/web-socket';
import { applyPatches as applyUserListPatches } from './users/actions';
import { ApplyPatchesActionType as ApplyUserListPatchesActionType } from './users/types';

interface IPatchData {
  [s: string]: Patch[]
}

interface IApplyPatches {
  [s: string]: IApplyPatchesActions
}

type IApplyPatchesActions = (patches: Patch[]) => ApplyUserListPatchesActionType
// | ApplyCurrentUserPatchesAction

const ws: IWebSocketHandler = webSocketHanlder.getInstance();

const applyPatchesFunctions: IApplyPatches = {
  userList: applyUserListPatches,
  // currentUser: ...,
  // ui:...,
};

export default {
  init: (dispatch:Dispatch): void => ws.setOnMesageReceivedHandler((event: MessageEvent<any>) => {
    const patches: IPatchData = JSON.parse(event.data);

    Object.keys(patches).forEach((key: string) => {
      const applyPatchesFunction = applyPatchesFunctions[key];
      dispatch(applyPatchesFunction(patches[key]));
    });
  }),
};
