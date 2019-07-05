import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function WordPairAddDialog({ visible }) {
    const classes = useStyles();

    return (
        <div>
            <Zoom in={visible}>
                <Fab
                    className={classes.fab}
                    color="primary"
                    onClick={null}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
        </div>
    );
}

WordPairAddDialog.propTypes = {
    visible: PropTypes.bool.isRequired
};

export default WordPairAddDialog;
