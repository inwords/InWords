import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/index';
import CloseIcon from '@material-ui/icons/Close';

function WordPairsUncheckButton({ handleUncheck }) {
    return (
        <IconButton
            color="inherit"
            aria-label="Close"
            onClick={handleUncheck}
        >
            <CloseIcon />
        </IconButton>
    );
}

WordPairsUncheckButton.propTypes = {
    handleUncheck: PropTypes.func.isRequired
};

export default WordPairsUncheckButton;
