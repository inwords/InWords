import commonConstants from '../constants/commonConstants';

const beginLoading = () => ({
    type: commonConstants.BEGIN_LOADING
});

const endLoading = () => ({
    type: commonConstants.END_LOADING
});

export const setSnackbarMessage = snackbarMessage => ({
    type: commonConstants.SET_SNACKBAR_MESSAGE,
    payload: snackbarMessage
});

export const resetSnackbarMessage = () => ({
    type: commonConstants.RESET_SNACKBAR_MESSAGE
});

export default {
    beginLoading,
    endLoading,
    setSnackbarMessage,
    resetSnackbarMessage
};
