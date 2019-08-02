import * as commonConstants from 'constants/commonConstants';

export const beginLoading = () => ({
  type: commonConstants.BEGIN_LOADING,
});

export const endLoading = () => ({
  type: commonConstants.END_LOADING,
});

export const setSnackbarMessage = snackbarMessage => ({
  type: commonConstants.SET_SNACKBAR_MESSAGE,
  payload: snackbarMessage,
});

export const resetSnackbarMessage = () => ({
  type: commonConstants.RESET_SNACKBAR_MESSAGE,
});
