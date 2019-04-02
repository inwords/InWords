import errorMessageConstants from '../constants/errorMessageConstants';

const setErrorMessage = message => ({
    type: errorMessageConstants.ERROR_MESSAGE_SETTING,
    payload: message
});

const resetErrorMessage = () => ({
    type: errorMessageConstants.ERROR_MESSAGE_RESET
});

const errorMessageActions = {
    setErrorMessage,
    resetErrorMessage
};

export default errorMessageActions;
