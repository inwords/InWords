import { accessConstants } from '../constants/accessConstants';

export const accessToken = (state = null, action) => {
    if (action.type ===  accessConstants.ACCESS_GRANT) {
        return action.payload.access_token;
    }
    return state;
};
