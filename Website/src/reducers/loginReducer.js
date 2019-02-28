import { userConstants } from '../constants/userConstants'

const initialState = {
    redirect: false,
    error: {}
};

export function login(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return { ...state, redirect: false, error: {} };
        case userConstants.LOGIN_SUCCESS:
            return { ...state, redirect: true };
        case userConstants.LOGIN_REDIRECTED:
            return { ...state, redirect: false };
        case userConstants.LOGIN_FAILURE:
            return { ...state, redirect: false, error: action.payload };
        default:
            return state;
    }
};
