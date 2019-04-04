import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import WordPairActionsDialog from './WordPairActionsDialog';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

function WordPairAddition({ handleOpen, classes, ...rest }) {
    return (
        <Fragment>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleOpen}
            >
                Добавить
            </Button>
            <WordPairActionsDialog {...rest} />
        </Fragment>
    );
}

WordPairAddition.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairAddition);
