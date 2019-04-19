import accessConstants from '../constants/accessConstants';

const initialState = {
    token: null,
    userId: null
};

const access = (state = initialState, action) => {
    if (action.type === accessConstants.ACCESS_GRANT) {
        return action.payload.token && action.payload.userId ? {
                token: action.payload.token,
                userId: action.payload.userId
            } :
            initialState;
    }
    return state;
};

export default access;
