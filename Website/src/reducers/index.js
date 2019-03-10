import { combineReducers } from 'redux';
import { accessToken } from './accessToken';
import { isFetching } from './isFetching';
import { user } from './user';
import { wordlist } from './wordlist';
import { game } from './game';
import { errorMessage } from './errorMessage';

export const rootReducer = combineReducers({
    accessToken: accessToken,
    isFetching: isFetching,
    user: user,
    wordlist: wordlist,
    game: game,
    errorMessage: errorMessage
});
