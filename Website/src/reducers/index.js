import { combineReducers } from 'redux';
import { DENY_ACCESS } from 'src/actions/accessActions';
import common from './common';
import access from './access';
import userInfo from './userInfo';
import wordPairs from './wordPairs';
import training from './training';

const appReducer = combineReducers({
  common,
  access,
  userInfo,
  wordPairs,
  training
});

export default function rootReducer(state, action) {
  if (action.type === DENY_ACCESS) {
    state = undefined;
  }

  return appReducer(state, action);
}
