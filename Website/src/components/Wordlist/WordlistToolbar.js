import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import WordPairAddContainer from '../../containers/Wordlist/WordPairAddContainer';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

function WordlistToolbar({ delAvailable, handleDelWordPairs, classes }) {
    return (
        <Fragment>
            <WordPairAddContainer />
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
