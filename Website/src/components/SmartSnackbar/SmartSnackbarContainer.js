import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetSnackbar } from 'src/actions/commonActions';
import SmartSnackbar from './SmartSnackbar'

function SmartSnackbarContainer() {
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
    <SmartSnackbar
      open={open}
      text={text}
      actionText={actionText}
      handleAction={handleAction}
      handleClose={handleClose}
    />
  );
}

export default SmartSnackbarContainer;
