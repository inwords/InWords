import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { DENY_ACCESS } from 'src/actions/accessActions';
import common from './common';
import access from './access';
import userInfo from './userInfo';
import dictionary from './dictionary';
import training from './training';

const createRootReducer = history => (state, action) => {
  if (action.type === DENY_ACCESS) {
    state = undefined;
  }

  const appReducer = combineReducers({
    router: connectRouter(history),
    common,
    access,
    userInfo,
    dictionary,
    training
  });

  return appReducer(state, action);
};

export default createRootReducer;
