import { combineReducers } from 'redux';
import { DENY_ACCESS } from 'src/actions/accessActions';
import common from './common';
import access from './access';
import userInfo from './userInfo';
import dictionary from './dictionary';
import training from './training';

const appReducer = combineReducers({
  common,
  access,
  userInfo,
  dictionary,
  training
});

export default function rootReducer(state, action) {
  if (action.type === DENY_ACCESS) {
    state = undefined;
  }

  return appReducer(state, action);
}
