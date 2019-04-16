import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import useOpeningBehavoiur from '../../hooks/useOpeningBehaviour';
import GamePackAdditionDialog from './GamePackAdditionDialog';

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

function GamePackAddition({ visible, handleReset, handleSubmit, classes, ...rest }) {
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
            <Zoom
                in={visible}
                unmountOnExit
            >
                <Fab
                    className={classes.fab}
                    color="primary"
                    onClick={handleOpenWithReset}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
            <GamePackAdditionDialog
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmitWithClose}
                {...rest}
            />
        </>
    );
}

GamePackAddition.propTypes = {
    handleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GamePackAddition);
