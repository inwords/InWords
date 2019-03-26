import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

function WordlistToolbar({ delAvailable, handleDelWordPairs, classes }) {
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Fragment>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleClickOpen}
            >
                Добавить
            </Button>
            <Button
                variant="contained"
                color="secondary"
                disabled={!delAvailable}
                className={classes.button}
                onClick={handleDelWordPairs}
            >
                Удалить
            </Button>
        </Fragment>
    );
}

WordlistToolbar.propTypes = {
    delAvailable: PropTypes.bool.isRequired,
    handleDelWordPairs: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordlistToolbar);
