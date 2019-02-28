import { combineReducers } from 'redux';
import { login } from './loginReducer';
import { credentials } from './credentialsReducer';
import { register } from './registerReducer';
import { pullWordPairs } from './pullWordPairsReducer';
import { delWordPairs } from './delWordPairsReducer';
import { wordPairsRelevance } from './wordPairsRelevanceReducer';

export const rootReducer = combineReducers({
    login: login,
    register: register,
    credentials: credentials,
    pullWordPairs: pullWordPairs,
    delWordPairs: delWordPairs,
    wordPairsRelevance: wordPairsRelevance
});
