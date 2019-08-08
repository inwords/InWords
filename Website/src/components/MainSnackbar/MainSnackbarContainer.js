import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as commonActions from 'actions/commonActions';
import MainSnackbar from './MainSnackbar';

function MainSnackbarContainer() {
  const { open, text, actionText, actionHandler } = useSelector(
    store => store.common.snackbar
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    const resetSnackbar = () => {
      dispatch(commonActions.resetSnackbar());
    };

    resetSnackbar();
  };

  const handleAction = () => {
    if (actionHandler) {
      actionHandler();
    }

    handleClose();
  };

  return (
    <MainSnackbar
      open={open}
      text={text}
      actionText={actionText}
      handleAction={handleAction}
      handleClose={handleClose}
    />
  );
}

export default MainSnackbarContainer;
