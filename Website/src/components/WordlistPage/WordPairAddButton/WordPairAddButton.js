import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab/index';
import AddIcon from '@material-ui/icons/Add';
import WordPairActionsDialog from '../WordPairActionsDialog';
import Zoom from '@material-ui/core/Zoom/index';

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

function WordPairAddButton({ handleOpen, classes, ...rest }) {
    return (
        <>
            <Zoom in>
                <Fab
                    className={classes.fab}
                    color="primary"
                    onClick={handleOpen}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
            <WordPairActionsDialog
                title="Добавление"
                {...rest}
            />
        </>
    );
}

WordPairAddButton.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairAddButton);
