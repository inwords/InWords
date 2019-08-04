import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as commonActions from 'actions/commonActions';
import MainSnackbar from './MainSnackbar';

function MainSnackbarContainer() {
  const { open, message } = useSelector(store => store.common.snackbar);

  const dispatch = useDispatch();

  const handleClose = () => {
    const resetSnackbarMessage = () =>
      dispatch(commonActions.resetSnackbarMessage());

    resetSnackbarMessage();
  };

  return (
    <MainSnackbar open={open} message={message} handleClose={handleClose} />
  );
}

export default MainSnackbarContainer;
