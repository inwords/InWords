import { errorMessageConstants } from '../constants/errorMessageConstants';

const setErrorMessage = message => ({
    type: errorMessageConstants.ERROR_MESSAGE_SET, // setting initialization
    payload: message
});

const resetErrorMessage = () => ({
    type: errorMessageConstants.ERROR_MESSAGE_RESET
});

export const errorMessageActions = {
    setErrorMessage: setErrorMessage,
    resetErrorMessage: resetErrorMessage
};
