import { errorMessageConstants } from '../constants/errorMessageConstants';

const resetErrorMessage = () => ({
    type: errorMessageConstants.ERROR_MESSAGE_RESET
});

export const ErrorMessageActions = {
    resetErrorMessage
};
