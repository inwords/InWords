import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/index';
import Typography from '@material-ui/core/Typography/index';
import Grow from '@material-ui/core/Grow/index';

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
        padding: theme.spacing.unit,
        textAlign: 'center',
        overflowWrap: 'break-word',
    },
});

function GameWordCard({ word, selected, successful, successfulSelected, classes }) {
    return (
        <>
            <Grow in={!(selected || successful)}>
                {!(selected || successful) ?
                    <Paper className={classes.paper} /> :
                    <Paper />}
            </Grow>
            <Grow in={selected || successful}>
                {(selected || successful) ?
                    <Paper className={classes.paper} elevation={successfulSelected ? 5 : 2}>
                        <Typography variant="h6" className={classes.text}>
                            {word}
                        </Typography>
                    </Paper> :
                    <Paper />}
            </Grow>
        </>
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
