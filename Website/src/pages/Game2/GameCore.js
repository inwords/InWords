import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Chip from '@material-ui/core/Chip';
import Fade from '@material-ui/core/Fade';
import GameResult from './GameResult';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    maxWidth: theme.spacing(40)
  },
  header: {
    marginBottom: theme.spacing(1)
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

function GameCore({
  currentWordSet,
  wordsStatusColorsMap,
  isClickDone,
  isGameCompleted,
  isResultReady,
  handleClick,
  handleOpenNextSet,
  ...rest
}) {
  const classes = useStyles();

  const {
    primaryWordInfo: { word: primaryWord },
    secondaryWordsInfo
  } = currentWordSet;

  return !isResultReady ? (
    <Fade in={!isGameCompleted}>
      <div className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.header}
        >
          <Grid item>
            <Typography component="span" variant="h6">
              {primaryWord}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="next"
              onClick={handleOpenNextSet}
              disabled={!isClickDone}
              className={classes.button}
            >
              <PlayArrowIcon aria-label="next word" fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container justify="center">
          {secondaryWordsInfo.map(secondaryWordInfo => {
            const { id, pairId, word } = secondaryWordInfo;

            return (
              <Grid key={id} item>
                <Chip
                  label={word}
                  onClick={!isClickDone ? handleClick(pairId, id) : null}
                  color={wordsStatusColorsMap[id] || 'default'}
                  className={classes.chip}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Fade>
  ) : (
    <GameResult {...rest} />
  );
}

GameCore.propTypes = {
  currentWordSet: PropTypes.shape({
    primaryWordInfo: PropTypes.shape({
      word: PropTypes.string.isRequired
    }).isRequired,
    secondaryWordsInfo: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number.isRequired,
        pairId: PropTypes.number.isRequired,
        word: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  wordsStatusColorsMap: PropTypes.objectOf(PropTypes.string.isRequired)
    .isRequired,
  isClickDone: PropTypes.bool.isRequired,
  isGameCompleted: PropTypes.bool.isRequired,
  isResultReady: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleOpenNextSet: PropTypes.func.isRequired,
  score: PropTypes.number,
  handleReplay: PropTypes.func
};

export default GameCore;
