import { combineReducers } from 'redux';
import { isFetching } from './isFetching';
import { accessToken } from './accessToken';
import { user } from './user';
import { wordlist } from './wordlist';
import { game } from './game';
import { errorMessage } from './errorMessage';
import { accessConstants } from '../constants/accessConstants';

const appReducer = combineReducers({
    isFetching: isFetching,
    accessToken: accessToken,
    user: user,
    wordlist: wordlist,
    game: game,
    errorMessage: errorMessage
});

export function rootReducer (state, action) {
    if (action.type === accessConstants.ACCESS_DENIED) {
        state = undefined
    }

    return appReducer(state, action);
}
