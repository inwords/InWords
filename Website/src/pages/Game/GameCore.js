import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import GameResult from 'components/GameResult';

const cardDimension = 110;
const cardsSpacing = 1;

const useStyles = makeStyles(theme => ({
  twoColumnsLayout: {
    [theme.breakpoints.up(
      cardDimension * 2 + theme.spacing(cardsSpacing * 4)
    )]: {
      width: cardDimension * 2 + theme.spacing(cardsSpacing * 2),
      margin: 'auto'
    }
  },
  threeColumnsLayout: {
    [theme.breakpoints.up(
      cardDimension * 3 + theme.spacing(cardsSpacing * 6)
    )]: {
      width: cardDimension * 3 + theme.spacing(cardsSpacing * 3),
      margin: 'auto'
    }
  },
  fourColumnsLayout: {
    [theme.breakpoints.up(
      cardDimension * 4 + theme.spacing(cardsSpacing * 8)
    )]: {
      width: cardDimension * 4 + theme.spacing(cardsSpacing * 4),
      margin: 'auto'
    }
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    width: cardDimension,
    minHeight: cardDimension,
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: 'inherit',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper
  },
  cardText: {
    width: '100%',
    padding: theme.spacing(1),
    textAlign: 'center',
    lineHeight: 1.3,
    wordWrap: 'break-word',
    fontWeight: '500'
  }
}));

function GameCore({
  wordsInfo,
  selectedWordIdsMap,
  selectedWordsInfo,
  completedPairIdsMap,
  selectedCompletedPairId,
  isGameCompleted,
  isResultReady,
  handleClick,
  ...rest
}) {
  const classes = useStyles();

  const rootClass = useMemo(() => {
    const columnsNum = Math.ceil(Math.sqrt(wordsInfo.length));

    if (columnsNum <= 2) {
      return classes.twoColumnsLayout;
    } else if (columnsNum === 3) {
      return classes.threeColumnsLayout;
    } else {
      return classes.fourColumnsLayout;
    }
  }, [wordsInfo.length, classes]);

  return !isResultReady ? (
    <div className={rootClass}>
      <Grid container justify="center" spacing={cardsSpacing}>
        {wordsInfo.map(randomWordInfo => {
          const { id, pairId, word } = randomWordInfo;

          return (
            <Grid key={id} item>
              <Grow in={!isGameCompleted}>
                <div>
                  <Paper
                    elevation={selectedCompletedPairId === pairId ? 8 : 2}
                    onClick={handleClick(pairId, id)}
                    className={classes.card}
                  >
                    <Zoom
                      in={
                        completedPairIdsMap[pairId] ||
                        Boolean(
                          selectedWordsInfo.find(
                            selectedWordInfo => selectedWordInfo.id === id
                          )
                        )
                      }
                    >
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
    </div>
  ) : (
    <GameResult {...rest} />
  );
}

GameCore.propTypes = {
  wordsInfo: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      pairId: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selectedWordsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  completedPairIdsMap: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  selectedCompletedPairId: PropTypes.number.isRequired,
  isGameCompleted: PropTypes.bool.isRequired,
  isResultReady: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  score: PropTypes.number,
  handleReplay: PropTypes.func
};

export default GameCore;
