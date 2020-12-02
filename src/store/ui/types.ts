import * as UIActions from './constants';

interface ToggleLoadingSpinner {
  type: typeof UIActions.TOGGLE_LOADING_SPINNER
}

interface TriggerUserSearch {
  type: typeof UIActions.TRIGGER_USER_SEARCH
  payload: {
    query: string
  }
}

export interface ISearch {
  query: string
}

export interface IUI {
  loading: boolean
  search :ISearch
}

export type UIActionTypes = TriggerUserSearch
| ToggleLoadingSpinner;
