import commonConstants from '../constants/commonConstants';

const beginLoading = () => ({
    type: commonConstants.LOADING_BEGIN
});

const endLoading = () => ({
    type: commonConstants.LOADING_END
});

export const setErrorMessage = message => ({
    type: commonConstants.ERROR_MESSAGE_SETTING,
    payload: message
});

export const resetErrorMessage = () => ({
    type: commonConstants.ERROR_MESSAGE_RESET
});

export default {
    beginLoading,
    endLoading,
    setErrorMessage,
    resetErrorMessage
};
