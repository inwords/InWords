import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab/index';
import AddIcon from '@material-ui/icons/Add';
import useOpeningBehavoiur from '../../../hooks/useOpeningBehaviour';
import WordPairActionsDialog from '../WordPairActionsDialog';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

function WordPairAddButton({ handleReset, handleSubmit, classes, ...rest }) {
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
            <Fab
                className={classes.fab}
                color="primary"
                onClick={handleOpenWithReset}
            >
                <AddIcon />
            </Fab>
            <WordPairActionsDialog
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmitWithClose}
                {...rest}
            />
        </>
    );
}

WordPairAddButton.propTypes = {
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairAddButton);
