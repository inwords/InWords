import * as commonConstants from 'constants/commonConstants';

export const beginLoading = () => ({
  type: commonConstants.BEGIN_LOADING
});

export const endLoading = () => ({
  type: commonConstants.END_LOADING
});

export const setSnackbar = text => ({
  type: commonConstants.SET_SNACKBAR,
  payload: text
});

export const resetSnackbar = () => ({
  type: commonConstants.RESET_SNACKBAR
});
