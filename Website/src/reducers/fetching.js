import { fetchingConstants } from '../constants/fetchingConstants';

export const fetching = (state = false, action) => {
    switch (action.type) {
        case fetchingConstants.FETHING_REQUEST:
            return true;
        case fetchingConstants.FETHING_SUCCESS:
            return false;
        case fetchingConstants.FETHING_FAILURE:
            return false;
        default:
            return state;
    }
};
