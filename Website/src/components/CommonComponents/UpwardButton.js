import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function UpwardButton({ history }) {
    return (
        <IconButton
            color="inherit"
            aria-label="Close"
            onClick={history.goBack}
        >
            <ArrowBackIcon />
        </IconButton>
    );
}

UpwardButton.propTypes = {
    history: PropTypes.object.isRequired
};

export default withRouter(UpwardButton);
