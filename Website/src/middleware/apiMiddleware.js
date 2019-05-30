import commonActions from '../actions/commonActions';
import accessActions from '../actions/accessActions';
import history from '../history';

const API_ROOT = 'https://api.inwords.ru';

export const API_CALL = 'API_CALL';

const apiMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);

    if (action.type !== API_CALL) {
        return;
    }

    const {
        apiVersion,
        endpoint,
        method,
        data,
        actionsOnSuccess,
        redirection,
        errorMessage
    } = action.payload;

    dispatch(commonActions.beginLoading());

    fetch(`${API_ROOT}/${apiVersion}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().access.token}`
        },
        body: data
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    dispatch(accessActions.denyAccess());
                    history.push('/login');
                    throw Error('Ошибка доступа');
                }

                throw Error(errorMessage);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }

            return null;
        })
        .then(data => {
            dispatch(commonActions.endLoading());
            actionsOnSuccess.forEach(action => dispatch(action(data)));

            if (redirection) {
                history.push(redirection);
            }
        })
        .catch(error => {
            dispatch(commonActions.endLoading());
            dispatch(commonActions.setErrorMessage(error.message));
        })
};

export default apiMiddleware;
