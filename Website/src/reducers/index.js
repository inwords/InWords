import { combineReducers } from 'redux';
import { auth } from './authReducer';
import { authToken } from './authTokenReducer';
import { register } from './registerReducer';

export const rootReducer = combineReducers({
    auth: auth,
    authToken: authToken,
    register: register
});
