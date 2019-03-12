import { accessConstants } from '../constants/accessConstants';

export const accessToken = (state = null, action) => {
    if (action.type === accessConstants.ACCESS_GRANTED) {
        return action.payload;
    }

    return state;
};
