import { API_CALL } from '../middleware/apiMiddleware';

export default function apiAction({
    endpoint = '',
    method = 'GET',
    data = null,
    actionsOnSuccess = [],
    redirection = null,
    errorMessage = null
}) {
    return {
        type: API_CALL,
        payload: {
            endpoint,
            method,
            data,
            actionsOnSuccess,
            redirection,
            errorMessage
        }
    };
};
