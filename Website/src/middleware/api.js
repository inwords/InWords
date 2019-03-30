import axios from 'axios';
import { dataTransferActions } from '../actions/dataTransferActions';
import { errorMessageActions } from '../actions/errorMessageActions';
import { accessActions } from '../actions/accessActions';

const API_ROOT = 'https://api.inwords.ru/v1.0/';

const apiMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);

    if (action.type !== 'API') return;

    const {
        endpoint,
        method,
        data,
        onSuccess,
        errorMessage
    } = action.payload;

    const url = API_ROOT + endpoint;
    const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getState().accessToken}`
        }
    });

    dispatch(dataTransferActions.beginDataTransfer());

    axiosInstance.request({
        url,
        method,
        [dataOrParams]: data
    })
        .then(({ data }) => {
            onSuccess.forEach((action) => dispatch(action(data)));
        })
        .catch(error => {
            console.error(error);
            dispatch(errorMessageActions.setErrorMessage(errorMessage));

            if (error.response && error.response.status === 401) {
                dispatch(accessActions.denyAccess());
            }
        }).finally(() => {
            dispatch(dataTransferActions.endDataTransfer());
        });
};

export default apiMiddleware;
