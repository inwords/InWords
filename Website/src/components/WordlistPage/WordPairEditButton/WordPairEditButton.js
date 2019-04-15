import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/index';
import EditIcon from '@material-ui/icons/Edit';
import WordPairActionsDialog2 from '../WordPairActionsDialog';

function WordPairEditButton({ handleOpen, classes, ...rest }) {
    return (
        <>
            <IconButton aria-label="Edit" onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <WordPairActionsDialog2
                title="Редактирование"
                {...rest}
            />
        </>
    );
}

WordPairEditButton.propTypes = {
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default WordPairEditButton;
