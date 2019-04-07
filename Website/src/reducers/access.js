import accessConstants from '../constants/accessConstants';

const initialState = {
    token: null,
    userId: null
};

const access = (state = initialState, action) => {
    if (action.type ===  accessConstants.ACCESS_GRANT) {
        return {
            token: action.payload.token || null,
            userId: action.payload.userId || null
        };
    }
    return state;
};

export default access;
