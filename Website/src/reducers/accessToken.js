import accessConstants from '../constants/accessConstants';

const accessToken = (state = null, action) => {
    if (action.type ===  accessConstants.ACCESS_GRANT) {
        return action.payload.Token;
    }
    return state;
};

export default accessToken;
