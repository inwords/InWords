import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

function WordPairsDeletionButton({ available, handleWordPairsDeletion, classes }) {
    return (
        <Button
            color="secondary"
            disabled={!available}
            className={classes.button}
            onClick={handleWordPairsDeletion}
        >
            Удалить выбранные
        </Button>
    );
}

WordPairsDeletionButton.propTypes = {
    available: PropTypes.bool.isRequired,
    handleWordPairsDeletion: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordPairsDeletionButton);
