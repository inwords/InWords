import { API_CALL } from '../middleware/apiMiddleware';

export default function apiAction({
    apiVersion = 'v1.0',
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
            apiVersion,
            endpoint,
            method,
            data,
            actionsOnSuccess,
            redirection,
            errorMessage
        }
    };
};
