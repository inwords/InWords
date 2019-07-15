import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as commonActions from '../../actions/commonActions';
import MainSnackbar from './MainSnackbar';

function MainSnackbarContainer() {
    const { open, message } = useSelector(store => store.common.snackbar);

    const dispatch = useDispatch();
    const resetSnackbarMessage = useCallback(
        () => dispatch(commonActions.resetSnackbarMessage()),
        [dispatch]
    );

    const handleClose = () => {
        resetSnackbarMessage();
    };

    return (
        <MainSnackbar
            open={open}
            message={message}
            handleClose={handleClose}
        />
    );
}

export default MainSnackbarContainer;
