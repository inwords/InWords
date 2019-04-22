import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/index';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    button: {
        marginRight: 20,
    },
};

function WordPairsUncheckButton({ handleUncheck, classes }) {
    return (
        <IconButton
            color="inherit"
            aria-label="Close"
            onClick={handleUncheck}
            className={classes.button}
        >
            <CloseIcon />
        </IconButton>
    );
}

WordPairsUncheckButton.propTypes = {
    handleUncheck: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairsUncheckButton);
