import { accessTokenConstants } from '../constants/accessTokenConstants';

const accessTokenValid = (accessToken) => ({
    type: accessTokenConstants.ACCESS_TOKEN_VALID,
    payload: accessToken
});

const accessTokenInvalid = () => ({
    type: accessTokenConstants.ACCESS_TOKEN_INVALID
});

const handleAccessError = (response, dispatch) => {
    if (response.status === 401) {
        dispatch(accessTokenInvalid());
    }
};

export const AccessTokenActions = {
    accessTokenValid,
    accessTokenInvalid,
    handleAccessError
};
