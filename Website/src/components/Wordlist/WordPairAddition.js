import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import useOpeningBehavoiur from '../../logic-hooks/useOpeningBehaviour';
import WordPairActionsDialog from './WordPairActionsDialog';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

function WordPairAddition({ handleReset, handleSubmit, classes, ...rest }) {
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
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleOpenWithReset}
            >
                Добавить
            </Button>
            <WordPairActionsDialog
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmitWithClose}
                {...rest}
            />
        </Fragment>
    );
}

WordPairAddition.propTypes = {
    handleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairAddition);
