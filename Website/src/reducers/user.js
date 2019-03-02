import { combineReducers } from 'redux';
import { userConstants } from '../constants/userConstants';

const initialState = {
    isFetching: false,
    redirect: false
};

function login(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return { ...state, isFetching: true, redirect: false };
        case userConstants.LOGIN_SUCCESS:
            return { ...state, isFetching: false, redirect: true };
        case userConstants.LOGIN_REDIRECTED:
            return { ...state, redirect: false };
        case userConstants.LOGIN_FAILURE:
            return { ...state, isFetching: false };
        default:
            return state;
    }
};

function register(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { ...state, isFetching: true, redirect: false };
        case userConstants.REGISTER_SUCCESS:
            return { ...state, isFetching: false, redirect: true };
        case userConstants.REGISTER_REDIRECTED:
            return { ...state, redirect: false };
        case userConstants.REGISTER_FAILURE:
            return { ...state, isFetching: false };
        default:
            return state;
    }
};

export const user = combineReducers({
    login: login,
    register: register
});
