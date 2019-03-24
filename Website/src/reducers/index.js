import { combineReducers } from 'redux';
import { accessConstants } from '../constants/accessConstants';
import { isFetching } from './isFetching';
import { accessToken } from './accessToken';
import { user } from './user';
import { wordlist } from './wordlist';
import { game } from './game';
import { errorMessage } from './errorMessage';

const appReducer = combineReducers({
    isFetching,
    accessToken,
    user,
    wordlist,
    game,
    errorMessage
});

export const rootReducer = (state, action) => {
    if (action.type === accessConstants.ACCESS_DENIED) {
        state = undefined;
    }
    return appReducer(state, action);
};
