import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function WordPairsUncheckButton({ handleReset }) {
    return (
        <IconButton
            color="inherit"
            aria-label="Close"
            onClick={handleReset}
        >
            <CloseIcon />
        </IconButton>
    );
}

WordPairsUncheckButton.propTypes = {
    handleReset: PropTypes.func.isRequired
};

export default WordPairsUncheckButton;
