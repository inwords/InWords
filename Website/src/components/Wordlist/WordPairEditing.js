import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import useOpeningBehavoiur from '../../logic-hooks/useOpeningBehaviour';
import WordPairActionsDialog from './WordPairActionsDialog';

function WordPairEditing({ handleReset, handleSubmit, ...rest }) {
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
        <Fragment>
            <IconButton aria-label="Edit" onClick={handleOpenWithReset}>
                <EditIcon />
            </IconButton>
            <WordPairActionsDialog
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmitWithClose}
                {...rest}
            />
        </Fragment>
    );
}

WordPairEditing.propTypes = {
    handleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default WordPairEditing;
