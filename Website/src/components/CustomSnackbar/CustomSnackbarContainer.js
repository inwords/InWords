import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetSnackbar } from 'src/actions/commonActions';
import CustomSnackbar from './CustomSnackbar';

function CustomSnackbarContainer() {
  const { open, text, actionText, actionHandler } = useSelector(
    store => store.common.snackbar
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetSnackbar());
  };

  const handleAction = () => {
    if (typeof actionHandler === 'function') {
      actionHandler();
    }
  };

  return (
    <CustomSnackbar
      open={open}
      text={text}
      actionText={actionText}
      handleAction={handleAction}
      handleClose={handleClose}
    />
  );
}

export default CustomSnackbarContainer;
