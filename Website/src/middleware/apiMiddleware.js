import axios from 'axios';
import dataTransferActions from '../actions/dataTransferActions';
import errorMessageActions from '../actions/errorMessageActions';
import accessActions from '../actions/accessActions';
import history from '../history/history';

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

    dispatch(dataTransferActions.beginDataTransfer());

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
            dispatch(dataTransferActions.endDataTransfer());
            actionsOnSuccess.forEach((action) => dispatch(action(data)));

            if (redirection) {
                history.push(redirection);
            }
        })
        .catch(error => {
            dispatch(dataTransferActions.endDataTransfer());
            dispatch(errorMessageActions.setErrorMessage(errorMessage));

            if (error.response && error.response.status === 401) {
                dispatch(accessActions.denyAccess());
                history.push('/login');
            }

            console.error(error);
        })
};

export default apiMiddleware;
