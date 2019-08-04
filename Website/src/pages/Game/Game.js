import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import GameResult from './GameResult';

const cardDimension = 140;
const cardsSpacing = 2;

const useStyles = makeStyles(theme => ({
  gridOfTwoColumns: {
    [theme.breakpoints.up(
      cardDimension * 2 + theme.spacing(cardsSpacing * 4)
    )]: {
      width: cardDimension * 2 + theme.spacing(cardsSpacing * 2),
      margin: 'auto',
    },
  },
  gridOfThreeColumns: {
    [theme.breakpoints.up(
      cardDimension * 3 + theme.spacing(cardsSpacing * 6)
    )]: {
      width: cardDimension * 3 + theme.spacing(cardsSpacing * 3),
      margin: 'auto',
    },
  },
  gridOfFourColumns: {
    [theme.breakpoints.up(
      cardDimension * 4 + theme.spacing(cardsSpacing * 8)
    )]: {
      width: cardDimension * 4 + theme.spacing(cardsSpacing * 4),
      margin: 'auto',
    },
  },
  card: {
    width: cardDimension,
    height: cardDimension,
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
  },
  cardInside: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  cardText: {
    fontWeight: 'bold',
    width: '100%',
    padding: theme.spacing(1),
    textAlign: 'center',
    overflowWrap: 'break-word',
  },
}));

function Game({
  randomWordsInfo,
  selectedCompletedPairId,
  isGameCompleted,
  isResultReady,
  score,
  handleClick,
  handleReplay,
}) {
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
    classes.gridOfFourColumns,
  ]);

  return (
    <Container component="div" maxWidth="md">
      {!isResultReady ? (
        <Grid container className={gridClass}>
          <Grid container justify="center" spacing={cardsSpacing}>
            {randomWordsInfo.map(randomWordInfo => (
              <Grid key={randomWordInfo.id} item>
                <Grow in={!isGameCompleted}>
                  <ButtonBase component="div">
                    <Paper
                      elevation={
                        selectedCompletedPairId === randomWordInfo.pairId
                          ? 7
                          : 2
                      }
                      onClick={handleClick(
                        randomWordInfo.pairId,
                        randomWordInfo.id
                      )}
                      className={classes.card}
                    >
                      <Zoom
                        in={
                          randomWordInfo.isSelected ||
                          randomWordInfo.isCompleted
                        }
                      >
                        <div className={classes.cardInside}>
                          <Typography
                            component="span"
                            className={classes.cardText}
                          >
                            {randomWordInfo.word}
                          </Typography>
                        </div>
                      </Zoom>
                    </Paper>
                  </ButtonBase>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <GameResult score={score} handleReplay={handleReplay} />
      )}
    </Container>
  );
}

Game.propTypes = {
  randomWordsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      pairId: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCompletedPairId: PropTypes.number.isRequired,
  isGameCompleted: PropTypes.bool.isRequired,
  isResultReady: PropTypes.bool.isRequired,
  score: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  handleReplay: PropTypes.func,
};

export default Game;
