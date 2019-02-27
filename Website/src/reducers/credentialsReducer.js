import { credentialsConstants } from '../constants/credentialsConstants';

const initialState = {
    token: ''
};

export function credentials(state = initialState, action) {
    switch (action.type) {
        case credentialsConstants.TOKEN_VALID:
            return { ...state, token: action.payload };
        case credentialsConstants.TOKEN_INVALID:
            return { ...state, token: '' };
        default:
            return state;
    }
};
