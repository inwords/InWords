import { userConstants } from '../constants/userConstants'

const initialState = {
    token: '',
    error: '',
    isFetching: false
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return { ...state, isFetching: true, error: '' };
        case userConstants.LOGIN_SUCCESS:
            return { ...state, isFetching: false, token: action.payload };
        case userConstants.LOGIN_FAILURE:
            return { ...state, isFetching: false, error: action.payload.message };
        case userConstants.REGISTER_REQUEST:
            return { ...state, isFetching: true, error: '' };
        case userConstants.REGISTER_SUCCESS:
            return { ...state, isFetching: false };
        case userConstants.REGISTER_FAILURE:
            return { ...state, isFetching: false, error: action.payload.message };
        default:
            return state;
    }
};
