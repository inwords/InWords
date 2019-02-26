import { combineReducers } from 'redux';
import { auth } from './authReducer';
import { authToken } from './authTokenReducer';
import { register } from './registerReducer';
import { wordlist } from './wordlistReducer';

export const rootReducer = combineReducers({
    auth: auth,
    authToken: authToken,
    register: register,
    wordlist: wordlist
});
