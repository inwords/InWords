import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import GameResult from './GameResult';

const cardDimension = 110;
const cardsSpacing = 1;

const useStyles = makeStyles(theme => ({
  gridOfTwoColumns: {
    [theme.breakpoints.up(
      cardDimension * 2 + theme.spacing(cardsSpacing * 4)
    )]: {
      width: cardDimension * 2 + theme.spacing(cardsSpacing * 2),
      margin: 'auto'
    }
  },
  gridOfThreeColumns: {
    [theme.breakpoints.up(
      cardDimension * 3 + theme.spacing(cardsSpacing * 6)
    )]: {
      width: cardDimension * 3 + theme.spacing(cardsSpacing * 3),
      margin: 'auto'
    }
  },
  gridOfFourColumns: {
    [theme.breakpoints.up(
      cardDimension * 4 + theme.spacing(cardsSpacing * 8)
    )]: {
      width: cardDimension * 4 + theme.spacing(cardsSpacing * 4),
      margin: 'auto'
    }
  },
  card: {
    width: cardDimension,
    height: cardDimension,
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius
  },
  cardText: {
    width: '100%',
    padding: theme.spacing(1),
    textAlign: 'center',
    wordWrap: 'break-word',
    lineHeight: 1.3,
    fontWeight: '500'
  }
}));

function Game({
  randomWordsInfo,
  selectedCompletedPairId,
  isGameCompleted,
  isResultReady,
  score,
  handleClick,
  handleReplay
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
    classes.gridOfFourColumns
  ]);

  return (
    <Container component="div" maxWidth="md">
      {!isResultReady ? (
        <Grid container className={gridClass}>
          <Grid container justify="center" spacing={cardsSpacing}>
            {randomWordsInfo.map(randomWordInfo => {
              const {
                id,
                pairId,
                word,
                isSelected,
                isCompleted
              } = randomWordInfo;

              return (
                <Grid key={id} item>
                  <Grow in={!isGameCompleted}>
                    <div>
                      <Paper
                        elevation={selectedCompletedPairId === pairId ? 7 : 2}
                        onClick={handleClick(pairId, id)}
                        className={classes.card}
                      >
                        <Zoom in={isSelected || isCompleted}>
                          <div className={classes.cardContent}>
                            <Typography
                              component="span"
                              className={classes.cardText}
                            >
                              {word}
                            </Typography>
                          </div>
                        </Zoom>
                      </Paper>
                    </div>
                  </Grow>
                </Grid>
              );
            })}
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
      id: PropTypes.number.isRequired,
      pairId: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired,
      isCompleted: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  selectedCompletedPairId: PropTypes.number.isRequired,
  isGameCompleted: PropTypes.bool.isRequired,
  isResultReady: PropTypes.bool.isRequired,
  score: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  handleReplay: PropTypes.func
};

export default Game;
