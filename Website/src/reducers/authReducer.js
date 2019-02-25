import { userConstants } from '../constants/userConstants'

const initialState = {
    error: ''
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return { ...state, error: '' };
        case userConstants.LOGIN_FAILURE:
            return { ...state, error: action.payload.message };
        default:
            return state;
    }
};
