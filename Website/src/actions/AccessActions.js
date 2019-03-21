import { accessConstants } from '../constants/accessConstants';

const accessGranted = (accessToken) => ({
    type: accessConstants.ACCESS_GRANTED,
    payload: accessToken
});

const accessDenied = () => ({
    type: accessConstants.ACCESS_DENIED
});

export const AccessActions = {
    accessGranted,
    accessDenied
};
