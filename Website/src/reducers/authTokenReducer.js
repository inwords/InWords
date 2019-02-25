import { userConstants } from '../constants/userConstants'

const initialState = {
    token: ''
};

export function authToken(state = initialState, action) {
    switch (action.type) {
        case userConstants.AUTH_TOKEN_VALID:
            return { ...state, token: action.payload };
        case userConstants.AUTH_TOKEN_INVALID:
            return { ...state, token: '' };
        default:
            return state;
    }
};
