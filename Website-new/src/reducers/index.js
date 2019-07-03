import { combineReducers } from 'redux';
import accessConstants from '../constants/accessConstants';
import common from './common';
import access from './access';

const appReducer = combineReducers({
    common,
    access,
});

const rootReducer = (state, action) => {
    if (action.type === accessConstants.DENY_ACCESS) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
