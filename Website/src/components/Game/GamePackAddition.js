import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import useOpeningBehavoiur from '../../logic-hooks/useOpeningBehaviour';
import GamePackAdditionDialog from './GamePackAdditionDialog';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

function GamePackAddition({ handleReset, handleSubmit, classes, ...rest }) {
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
                Создать
            </Button>
            <GamePackAdditionDialog
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmitWithClose}
                {...rest}
            />
        </Fragment>
    );
}

GamePackAddition.propTypes = {
    handleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GamePackAddition);
