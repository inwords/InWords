import { combineReducers } from 'redux';
import { accessConstants } from '../constants/accessConstants';
import { dataTransferInProgress } from './dataTransferInProgress';
import { accessToken } from './accessToken';
import { user } from './user';
import { wordlist } from './wordlist';
import { game } from './game';
import { errorMessage } from './errorMessage';

const appReducer = combineReducers({
    dataTransferInProgress,
    accessToken,
    user,
    wordlist,
    game,
    errorMessage
});

export const rootReducer = (state, action) => {
    if (action.type === accessConstants.ACCESS_DENY) {
        state = undefined;
    }
    return appReducer(state, action);
};
