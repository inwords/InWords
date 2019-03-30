export function apiAction({
    endpoint = '',
    method = 'GET',
    data = null,
    onSuccess = [],
    errorMessage = null
}) {
    return {
        type: 'API',
        payload: {
            endpoint,
            method,
            data,
            onSuccess,
            errorMessage
        }
    };
};
