import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import WordPairAddDialogContainer from '../../containers/Wordlist/WordPairAddDialogContainer';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

function WordPairAdd({ classes }) {
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
            <WordPairAddDialogContainer
                open={open}
                handleClose={handleClose}
            />
        </Fragment>
    );
}

WordPairAdd.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairAdd);
