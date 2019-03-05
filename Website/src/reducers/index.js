import { combineReducers } from 'redux';
import { accessToken } from './accessToken';
import { user } from './user';
import { wordlist } from './wordlist';
import { fetching } from './fetching';
import { errorMessage } from './errorMessage';

export const rootReducer = combineReducers({
    accessToken: accessToken,
    user: user,
    wordlist: wordlist,
    fetching: fetching,
    errorMessage: errorMessage
});
