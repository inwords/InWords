import axios from 'axios';
import commonActions from '../actions/commonActions';
import accessActions from '../actions/accessActions';
import history from '../history';

const API_ROOT = 'https://api.inwords.ru/v1.0/';

export const API_CALL = 'API_CALL';

const apiMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);

    if (action.type !== API_CALL) {
        return;
    }

    const {
        endpoint,
        method,
        data,
        actionsOnSuccess,
        redirection,
        errorMessage
    } = action.payload;

    const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

    dispatch(commonActions.beginLoading());

    axios.request({
        url: API_ROOT + endpoint,
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().access.token}`
        },
        [dataOrParams]: data
    })
        .then(({ data }) => {
            dispatch(commonActions.endLoading());
            actionsOnSuccess.forEach(action => dispatch(action(data)));

            if (redirection) {
                history.push(redirection);
            }
        })
        .catch(error => {
            dispatch(commonActions.endLoading());
            dispatch(commonActions.setErrorMessage(errorMessage));

            if (error.response && error.response.status === 401) {
                dispatch(accessActions.denyAccess());
                history.push('/login');
            }

            console.error(error);
        })
};

export default apiMiddleware;
