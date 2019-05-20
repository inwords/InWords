import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
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

function WordPairAddButtonWithDialog({ visible, handleClickOpen, classes, ...other }) {
    return (
        <>
            <Zoom in={visible}>
                <Fab
                    className={classes.fab}
                    color="primary"
                    onClick={handleClickOpen}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
            <WordPairActionsDialog
                title="Добавление"
                {...other}
            />
        </>
    );
}

WordPairAddButtonWithDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleClickOpen: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairAddButtonWithDialog);
