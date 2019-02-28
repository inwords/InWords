import { userConstants } from '../constants/userConstants'

const initialState = {
    redirect: false,
    error: {}
};

export function register(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { ...state, redirect: false, error: {} };
        case userConstants.REGISTER_SUCCESS:
            return { ...state, redirect: true };
        case userConstants.REGISTER_REDIRECTED:
            return { ...state, redirect: false };
        case userConstants.REGISTER_FAILURE:
            return { ...state, redirect: false, error: action.payload };
        default:
            return state;
    }
};
