import { combineReducers } from 'redux';
import { userConstants } from '../constants/userConstants';

const initialState = {
    redirect: false
};

function login(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REDIRECT:
            return { ...state, redirect: true };
        case userConstants.LOGIN_REDIRECTED:
            return { ...state, redirect: false };
        default:
            return state;
    }
};

function register(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REDIRECT:
            return { ...state, redirect: true };
        case userConstants.REGISTER_REDIRECTED:
            return { ...state, redirect: false };
        default:
            return state;
    }
};

export const user = combineReducers({
    login: login,
    register: register
});
