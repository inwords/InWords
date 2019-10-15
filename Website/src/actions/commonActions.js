export const BEGIN_LOADING = 'BEGIN_LOADING';
export const beginLoading = () => ({
  type: BEGIN_LOADING
});

export const END_LOADING = 'END_LOADING';
export const endLoading = () => ({
  type: END_LOADING
});

export const SET_SNACKBAR = 'SET_SNACKBAR';
export const setSnackbar = settings => ({
  type: SET_SNACKBAR,
  payload: settings
});

export const RESET_SNACKBAR = 'RESET_SNACKBAR';
export const resetSnackbar = () => ({
  type: RESET_SNACKBAR
});
