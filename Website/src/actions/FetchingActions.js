import { fetchingConstants } from '../constants/fetchingConstants';

const fetchingRequest = () => ({
    type: fetchingConstants.FETHING_REQUEST
});

const fetchingSuccess = () => ({
    type: fetchingConstants.FETHING_SUCCESS
});

const fetchingFailure = error => ({
    type: fetchingConstants.FETHING_FAILURE,
    error: error.message
});

export const FetchingActions = {
    fetchingRequest,
    fetchingSuccess,
    fetchingFailure
};
