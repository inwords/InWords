import accessConstants from '../constants/accessConstants';

const initialState = {
    token: null,
    userId: null
};

const access = (state = initialState, action) => {
    if (action.type === accessConstants.ACCESS_GRANT) {
        if (action.payload.token && action.payload.userId) {
            return {
                token: action.payload.token,
                userId: action.payload.userId
            };
        }
        return state;
    }
    return state;
};

export default access;
