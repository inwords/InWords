import commonConstants from '../constants/commonConstants';

const beginLoading = () => ({
    type: commonConstants.BEGIN_LOADING
});

const endLoading = () => ({
    type: commonConstants.END_LOADING
});

export const setSnackbar = snackbarSettings => ({
    type: commonConstants.SET_SNACKBAR,
    payload: snackbarSettings
});

export const resetSnackbar = () => ({
    type: commonConstants.RESET_SNACKBAR
});

export default {
    beginLoading,
    endLoading,
    setSnackbar,
    resetSnackbar
};
