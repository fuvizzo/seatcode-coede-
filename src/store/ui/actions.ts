import { UIActionTypes } from './types';
import * as UIActions from './constants';

const toggleLoadingSpinner = (): UIActionTypes => ({
  type: UIActions.TOGGLE_LOADING_SPINNER,
});

const triggerUserSearch = (query: string): UIActionTypes => ({
  type: UIActions.TRIGGER_USER_SEARCH,
  payload: { query },
});

export default {
  triggerUserSearch,
  toggleLoadingSpinner,
};
