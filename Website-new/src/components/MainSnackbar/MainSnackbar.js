import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

function MainSnackbar({ open, message, action = null, actionName = null, handleClose }) {
    const handleClick = () => {
        action();
        handleClose();
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={<span>{message}</span>}
            action={action && actionName && (
                <Button color="secondary" size="small" onClick={handleClick}>
                    {actionName}
                </Button>
            )}
        />
    );
}

MainSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string,
    action: PropTypes.func,
    actionName: PropTypes.string,
    handleClose: PropTypes.func.isRequired
};

export default memo(MainSnackbar);
