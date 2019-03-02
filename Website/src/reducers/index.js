import { combineReducers } from 'redux';
import { accessToken } from './accessToken';
import { user } from './user';
import { wordlist } from './wordlist';
import { errorMessage } from './errorMessage';

export const rootReducer = combineReducers({
    accessToken: accessToken,
    user: user,
    wordlist: wordlist,
    errorMessage: errorMessage
});
