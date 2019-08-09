import * as commonConstants from 'constants/commonConstants';

export const beginLoading = () => ({
  type: commonConstants.BEGIN_LOADING
});

export const endLoading = () => ({
  type: commonConstants.END_LOADING
});

export const setSnackbar = settings => ({
  type: commonConstants.SET_SNACKBAR,
  payload: settings
});

export const resetSnackbar = () => ({
  type: commonConstants.RESET_SNACKBAR
});
