import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = {
    backButton: {
        marginRight: 20,
    },
};

function UpwardButton({ history, classes }) {
    return (
        <IconButton
            color="inherit"
            aria-label="ArrowBack"
            onClick={history.goBack}
            className={classes.backButton}
        >
            <ArrowBackIcon />
        </IconButton>
    );
}

UpwardButton.propTypes = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
    withRouter(UpwardButton)
);
