import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

const cardDimension = 140;

const styles = theme => ({
    paper: {
        height: cardDimension,
        width: cardDimension,
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        width: cardDimension,
        overflowWrap: 'break-word',
        padding: theme.spacing.unit,
    },
});

function GameWordCard({ word, selected, successful, successfulSelected, classes }) {
    return (
        <Fragment>
            <Grow in={!(selected || successful)}>
                {!(selected || successful) ?
                    <Paper className={classes.paper} /> :
                    <Paper />}
            </Grow>
            <Grow in={(selected || successful)} >
                {(selected || successful) ?
                    <Paper className={classes.paper} elevation={(selected || successfulSelected) ? 5 : 2}>
                        <Typography variant="h6" align="center" className={classes.text}>
                            {word}
                        </Typography>
                    </Paper> :
                    <Paper />}
            </Grow>
        </Fragment>
    );
}

GameWordCard.propTypes = {
    word: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    successful: PropTypes.bool.isRequired,
    successfulSelected: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameWordCard);
