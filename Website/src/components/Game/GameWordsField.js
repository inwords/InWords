import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const cardDimension = 140;
const cardsSpacing = 16;

const styles = theme => ({
    gridTwoColumns: {
        width: 'auto',
        display: 'block',
        [theme.breakpoints.up(cardDimension * 2 + cardsSpacing * 2 * 2 + theme.spacing.unit * 3 * 2)]: {
            width: cardDimension * 2 + cardsSpacing * 2 * 2,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    gridThreeColumns: {
        width: 'auto',
        display: 'block',
        [theme.breakpoints.up(cardDimension * 3 + cardsSpacing * 3 * 2 + theme.spacing.unit * 3 * 2)]: {
            width: cardDimension * 3 + cardsSpacing * 3 * 2,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    gridFourColumns: {
        width: 'auto',
        display: 'block',
        [theme.breakpoints.up(cardDimension * 4 + cardsSpacing * 4 * 2 + theme.spacing.unit * 3 * 2)]: {
            width: cardDimension * 4 + cardsSpacing * 4 * 2,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
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

function GameWordsField({ randomWords, selectedWordsInfo, successfulPairIds, successfulSelectedPairId, handleClick, classes }) {
    const maxColumnsNum = Math.ceil(Math.sqrt(randomWords.length));

    return (
        <div>
            {/*randomWords.map((randomWord, index) =>
            <GameWordCard
                key={index}
                wordId={index}
                {...randomWord}
                selected={!!selectedWordsInfo.find((selectedWordInfo) => selectedWordInfo.wordId === index)}
                successful={!!~successfulPairIds.indexOf(randomWord.pairId)}
                successfulSelected={successfulSelectedPairId === randomWord.pairId}
                handleClick={handleClick}
            />)*/}
            <Grid
                container
                className={
                    maxColumnsNum <= 2 ? classes.gridTwoColumns :
                        maxColumnsNum === 3 ? classes.gridThreeColumns :
                            classes.gridFourColumns}
            >
                <Grid container className={classes.demo} justify="center" spacing={cardsSpacing}>
                    {randomWords.map((randomWord, index) => (
                        <Grid key={index} item>
                            <Paper className={classes.paper}>
                                <Typography variant="h6" align="center" className={classes.text}>
                                    {randomWord.word}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}

GameWordsField.propTypes = {
    randomWords: PropTypes.array.isRequired,
    selectedWordsInfo: PropTypes.array.isRequired,
    successfulPairIds: PropTypes.array.isRequired,
    successfulSelectedPairId: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GameWordsField);
