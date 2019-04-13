import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/index';
import EditIcon from '@material-ui/icons/Edit';
import useOpeningBehavoiur from '../../../hooks/useOpeningBehaviour';
import WordPairActionsDialog from '../WordPairActionsDialog';

function WordPairEditButton({ handleReset, handleSubmit, ...rest }) {
    const [open, handleOpen, handleClose] = useOpeningBehavoiur();

    const handleOpenWithReset = () => {
        handleOpen();
        handleReset();
    };

    const handleSubmitWithClose = event => {
        handleSubmit(event);
        handleClose();
    };

    return (
        <>
            <IconButton aria-label="Edit" onClick={handleOpenWithReset}>
                <EditIcon />
            </IconButton>
            <WordPairActionsDialog
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmitWithClose}
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
