import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Zoom from '@material-ui/core/Zoom';

const cardDimension = 140;
const cardsSpacing = 2;

const useStyles = makeStyles(theme => ({
    gridOfTwoColumns: {
        [theme.breakpoints.up(cardDimension * 2 + theme.spacing(cardsSpacing * 4))]: {
            width: cardDimension * 2 + theme.spacing(cardsSpacing * 2),
            margin: 'auto',
        },
    },
    gridOfThreeColumns: {
        [theme.breakpoints.up(cardDimension * 3 + theme.spacing(cardsSpacing * 6))]: {
            width: cardDimension * 3 + theme.spacing(cardsSpacing * 3),
            margin: 'auto',
        },
    },
    gridOfFourColumns: {
        [theme.breakpoints.up(cardDimension * 4 + theme.spacing(cardsSpacing * 8))]: {
            width: cardDimension * 4 + theme.spacing(cardsSpacing * 4),
            margin: 'auto',
        },
    },
    paper: {
        display: 'flex',
        height: cardDimension,
        alignItems: 'center',
        cursor: 'pointer',
    },
    text: {
        fontWeight: 'bold',
        width: cardDimension,
        padding: theme.spacing(1),
        textAlign: 'center',
        overflowWrap: 'break-word',
    },
}));

function Game({ randomWordsInfo, completedSelectedPairId, handleClick }) {
    const classes = useStyles();

    const gridClass = useMemo(() => {
        const columnsNum = Math.ceil(Math.sqrt(randomWordsInfo.length));

        if (columnsNum <= 2) {
            return classes.gridOfTwoColumns;
        } else if (columnsNum === 3) {
            return classes.gridOfThreeColumns;
        } else {
            return classes.gridOfFourColumns;
        }
    }, [
            randomWordsInfo.length,
            classes.gridOfTwoColumns,
            classes.gridOfThreeColumns,
            classes.gridOfFourColumns
        ]
    );

    return (
        <Container component="div" maxWidth="md">
            <Grid container className={gridClass}>
                <Grid container justify="center" spacing={cardsSpacing}>
                    {randomWordsInfo.map((randomWordInfo, index) =>
                        <Grid key={randomWordInfo.id} item>
                            <Zoom in style={{ transitionDelay: `${index * 70}ms` }}>
                                <ButtonBase component="div">
                                    <Paper
                                        elevation={completedSelectedPairId === randomWordInfo.pairId ? 5 : 2}
                                        onClick={handleClick(randomWordInfo.pairId, randomWordInfo.id)}
                                        className={classes.paper}
                                    >
                                        <Typography
                                            component="span"
                                            className={classes.text}
                                        >
                                            {randomWordInfo.word}
                                        </Typography>
                                    </Paper>
                                </ButtonBase>
                            </Zoom>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

Game.propTypes = {
    randomWordsInfo: PropTypes.arrayOf(PropTypes.shape({
        pairId: PropTypes.number.isRequired,
        word: PropTypes.string.isRequired
    })).isRequired,
    completedSelectedPairId: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default Game;
