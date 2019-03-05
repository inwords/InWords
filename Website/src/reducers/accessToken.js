import { accessTokenConstants } from '../constants/accessTokenConstants';

export const accessToken = (state = null, action) => {
    switch (action.type) {
        case accessTokenConstants.ACCESS_TOKEN_VALID:
            return action.payload;
        case accessTokenConstants.ACCESS_TOKEN_INVALID:
            return null;
        default:
            return state;
    }
};
