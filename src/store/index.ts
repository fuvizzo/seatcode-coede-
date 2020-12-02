import {
  createStore, applyMiddleware, compose, combineReducers, Action,
} from 'redux';

import thunk, { ThunkAction } from 'redux-thunk';

import UserListReducer from './users/reducer';
import CurrentUserReducer from './current-user/reducer';
import UIReducer from './ui/reducer';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  userList: UserListReducer,
  currentUser: CurrentUserReducer,
  ui: UIReducer,
});

const Store = createStore(
  rootReducer,
  // Note: the following line is just used to enable Redux Dev Tools
  storeEnhancers(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default Store;
