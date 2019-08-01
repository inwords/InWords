import { combineReducers } from 'redux';
import * as commonConstants from '../constants/commonConstants';

const loading = (state = false, action) => {
  switch (action.type) {
    case commonConstants.BEGIN_LOADING:
      return true;
    case commonConstants.END_LOADING:
      return false;
    default:
      return state;
  }
};

const initialSnackbarState = {
  open: false,
  message: '',
};

const snackbar = (state = initialSnackbarState, action) => {
  switch (action.type) {
    case commonConstants.SET_SNACKBAR_MESSAGE:
      return {
        open: true,
        message: action.payload,
      };
    case commonConstants.RESET_SNACKBAR_MESSAGE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

const common = combineReducers({
  loading,
  snackbar,
});

export default common;
