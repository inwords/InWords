import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab/index';
import AddIcon from '@material-ui/icons/Add';
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

function GamePackCreateButton({ visible, classes }) {
    return (
        <Zoom
            in={visible}
            unmountOnExit
        >
            <Fab
                className={classes.fab}
                color="primary"
                href="#game_pack_creation"
            >
                <AddIcon />
            </Fab>
        </Zoom>
    );
}

GamePackCreateButton.propTypes = {
    visible: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GamePackCreateButton);
