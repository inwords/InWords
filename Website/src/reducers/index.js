import { combineReducers } from 'redux';
import accessConstants from '../constants/accessConstants';
import dataTransferInProgress from './dataTransferInProgress';
import accessToken from './accessToken';
import userInfo from './userInfo';
import wordPairs from './wordPairs';
import game from './game';
import errorMessage from './errorMessage';

const appReducer = combineReducers({
    dataTransferInProgress,
    accessToken,
    userInfo,
    wordPairs,
    game,
    errorMessage
});

const rootReducer = (state, action) => {
    if (action.type === accessConstants.ACCESS_DENIAL) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
