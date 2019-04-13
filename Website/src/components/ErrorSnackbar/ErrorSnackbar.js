import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function ErrorSnackbar({ open, errorMessage, handleClose, classes }) {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <SnackbarContent
                className={classes.error}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <ErrorIcon className={classes.iconVariant} />
                        {errorMessage}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
}

ErrorSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorSnackbar);
