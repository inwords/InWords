import { combineReducers } from 'redux';
import { DENY_ACCESS } from 'src/actions/authActions';
import common from './common';
import auth from './auth';
import profile from './profile';
import dictionary from './dictionary';
import wordSet from './wordSet';

const rootReducer = (state, action) => {
  if (action.type === DENY_ACCESS) {
    state = undefined;
  }

  const appReducer = combineReducers({
    common,
    auth,
    profile,
    dictionary,
    wordSet
  });

  return appReducer(state, action);
};

export default rootReducer;
