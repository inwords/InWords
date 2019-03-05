import { errorConstants } from '../constants/errorConstants';

const resetErrorMessage = () => ({
    type: errorConstants.RESET_ERROR_MESSAGE
});

export const ErrorActions = {
    resetErrorMessage
};
