import { combineReducers } from 'redux';
import accessConstants from '../constants/accessConstants';
import common from './common';
import access from './access';
import userInfo from './userInfo';
import wordPairs from './wordPairs';
import game from './game';

const appReducer = combineReducers({
    common,
    access,
    userInfo,
    wordPairs,
    game
});

const rootReducer = (state, action) => {
    if (action.type === accessConstants.ACCESS_DENIAL) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
