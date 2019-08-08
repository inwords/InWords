import { combineReducers } from 'redux';
import * as commonConstants from 'constants/commonConstants';

function loading(state = false, action) {
  switch (action.type) {
    case commonConstants.BEGIN_LOADING:
      return true;
    case commonConstants.END_LOADING:
      return false;
    default:
      return state;
  }
}

const initialSnackbarState = {
  open: false,
  text: '',
  actionText: '',
  actionHandler: null
};

function snackbar(state = initialSnackbarState, action) {
  switch (action.type) {
    case commonConstants.SET_SNACKBAR:
      return {
        ...initialSnackbarState,
        ...action.payload,
        open: true
      };
    case commonConstants.RESET_SNACKBAR:
      return initialSnackbarState;
    default:
      return state;
  }
}

const common = combineReducers({
  loading,
  snackbar
});

export default common;
