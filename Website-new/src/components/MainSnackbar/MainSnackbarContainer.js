import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import commonActions from '../../actions/commonActions';
import MainSnackbar from './MainSnackbar';

function MainSnackbarContainer() {
    const { open, message, action, actionName } = useSelector(store => store.common.snackbar);

    const dispatch = useDispatch();
    const resetSnackbar = useCallback(
        () => dispatch(commonActions.resetSnackbar()),
        [dispatch]
    );

    const handleClose = () => {
        resetSnackbar();
    };

    return (
        <MainSnackbar
            open={open}
            message={message}
            action={action}
            actionName={actionName}
            handleClose={handleClose}
        />
    );
}

export default MainSnackbarContainer;
