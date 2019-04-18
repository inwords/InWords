import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab/index';
import AddIcon from '@material-ui/icons/Add';
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

function WordPairAddButtonWithDialog({ handleClickOpen, classes, ...other }) {
    return (
        <>
            <Fab
                className={classes.fab}
                color="primary"
                onClick={handleClickOpen}
            >
                <AddIcon />
            </Fab>
            <WordPairActionsDialog
                title="Добавление"
                {...other}
            />
        </>
    );
}

WordPairAddButtonWithDialog.propTypes = {
    handleClickOpen: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairAddButtonWithDialog);
