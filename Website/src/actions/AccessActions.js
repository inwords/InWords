import { accessConstants } from '../constants/accessConstants';

const accessGranted = (accessToken) => ({
    type: accessConstants.ACCESS_GRANTED,
    payload: accessToken
});

const accessDenied = () => ({
    type: accessConstants.ACCESS_DENIED
});

function handleAccessError(response, dispatch) {
    if (response.status === 401) {
        dispatch(accessDenied());
    }
}

export const AccessActions = {
    accessGranted,
    accessDenied,
    handleAccessError
};
