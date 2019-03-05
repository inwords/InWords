import { accessTokenConstants } from '../constants/accessTokenConstants';

const accessTokenValid = (accessToken) => ({
    type: accessTokenConstants.ACCESS_TOKEN_VALID,
    payload: accessToken
});

const accessTokenInvalid = () => ({
    type: accessTokenConstants.ACCESS_TOKEN_INVALID
});

export const AccessTokenActions = {
    accessTokenValid,
    accessTokenInvalid
};
