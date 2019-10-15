import { combineReducers } from 'redux';
import { DENY_ACCESS } from 'actions/accessActions';
import common from './common';
import access from './access';
import userInfo from './userInfo';
import wordPairs from './wordPairs';
import games from './games';

const appReducer = combineReducers({
  common,
  access,
  userInfo,
  wordPairs,
  games
});

export default function rootReducer(state, action) {
  if (action.type === DENY_ACCESS) {
    state = undefined;
  }

  return appReducer(state, action);
}
