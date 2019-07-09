import { CALL_API } from '../middleware/apiMiddleware';

export default function apiAction({
    apiVersion = 'v1.0',
    endpoint = '',
    method = 'GET',
    data = null,
    actionsOnSuccess = [],
    actionsOnFailure = []
}) {
    return {
        type: CALL_API,
        payload: {
            apiVersion,
            endpoint,
            method,
            data,
            actionsOnSuccess,
            actionsOnFailure
        }
    };
};
