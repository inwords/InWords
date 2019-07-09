import commonActions from '../actions/commonActions';
import accessActions from '../actions/accessActions';
import history from '../history';

const API_ROOT = 'https://api.inwords.ru';

export const CALL_API = 'CALL_API';

const apiMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);

    if (action.type !== CALL_API) return;

    const {
        apiVersion,
        endpoint,
        method,
        data,
        actionsOnSuccess,
        actionsOnFailure
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
                    history.push('/signIn');
                }

                throw Error(`${response.status} ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                return null;
            }

            return response.json();
        })
        .then(data => {
            dispatch(commonActions.endLoading());
            actionsOnSuccess.forEach(action => {
                action(dispatch, data);
            });
        })
        .catch(error => {
            dispatch(commonActions.endLoading());
            actionsOnFailure.forEach(action => {
                action(dispatch);
            });

            console.error(error);
        })
};

export default apiMiddleware;
