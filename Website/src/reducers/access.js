import accessConstants from '../constants/accessConstants';

const initialState = {
    token: null,
    userId: null
};

const access = (state = initialState, action) => {
    if (action.type ===  accessConstants.ACCESS_GRANT) {
        return {
            token: action.payload.token,
            userId: action.payload.userId
        };
    }
    return state;
};

export default access;
