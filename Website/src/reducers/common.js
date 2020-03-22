import { combineReducers } from 'redux';
import {
  BEGIN_LOADING,
  END_LOADING,
  SET_SNACKBAR,
  RESET_SNACKBAR
} from 'src/actions/commonActions';

const loading = (state = false, action) => {
  switch (action.type) {
    case BEGIN_LOADING:
      return true;
    case END_LOADING:
      return false;
    default:
      return state;
  }
};

const initialSnackbarState = {
  open: false,
  text: '',
  actionText: '',
  actionHandler: null
};

const snackbar = (state = initialSnackbarState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...initialSnackbarState,
        ...action.payload,
        open: true
      };
    case RESET_SNACKBAR:
      return initialSnackbarState;
    default:
      return state;
  }
};

export default combineReducers({
  loading,
  snackbar
});
