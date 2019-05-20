import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import WordPairActionsDialog from '../WordPairActionsDialog';

function WordPairEditButtonWithDialog({ handleClickOpen, ...other }) {
    return (
        <>
            <IconButton aria-label="Edit" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <WordPairActionsDialog
                title="Редактирование"
                {...other}
            />
        </>
    );
}

WordPairEditButtonWithDialog.propTypes = {
    handleClickOpen: PropTypes.func.isRequired
};

export default WordPairEditButtonWithDialog;
