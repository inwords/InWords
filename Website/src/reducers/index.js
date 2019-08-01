import { combineReducers } from 'redux';
import { DENY_ACCESS } from '../constants/accessConstants';
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
  games,
});

const rootReducer = (state, action) => {
  if (action.type === DENY_ACCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
