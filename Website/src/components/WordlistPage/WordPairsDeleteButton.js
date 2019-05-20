import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function WordPairsDeleteButton({ handleWordPairsDeletion }) {
    return (
        <IconButton
            color="inherit"
            aria-label="Close"
            onClick={handleWordPairsDeletion}
        >
            <DeleteIcon />
        </IconButton>
    );
}

WordPairsDeleteButton.propTypes = {
    handleWordPairsDeletion: PropTypes.func.isRequired
};

export default WordPairsDeleteButton;
