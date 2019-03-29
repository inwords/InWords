import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import WordPairEditDialog from './WordPairEditDialog';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

function WordPairAdd(props) {
    const { handleOpen, classes, ...rest } = props;

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
            <WordPairEditDialog
                {...rest}
            />
        </Fragment>
    );
}

WordPairAdd.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairAdd);
