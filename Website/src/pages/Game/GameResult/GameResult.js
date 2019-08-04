import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ReplayIcon from '@material-ui/icons/Replay';
import FastForwardIcon from '@material-ui/icons/FastForward';
import Smiley from './Smiley';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 220,
    padding: theme.spacing(3, 0),
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  smiley: {
    marginBottom: theme.spacing(1),
  },
  stars: {
    marginBottom: theme.spacing(1),
  },
}));

function GameResult({
  score,
  handleRedirectionToLevels,
  handleRedirectionToNextLevel,
  handleReplay,
}) {
  const classes = useStyles();

  return (
    <Fade in>
      <Paper className={classes.paper}>
        {score !== null && (
          <>
            <div className={classes.smiley}>
              <Smiley score={score} />
            </div>
            <div className={classes.stars}>
              <StarIcon
                fontSize="large"
                color={score > 0 ? 'secondary' : 'disabled'}
              />
              <StarIcon
                fontSize="large"
                color={score > 1 ? 'secondary' : 'disabled'}
              />
              <StarIcon
                fontSize="large"
                color={score > 2 ? 'secondary' : 'disabled'}
              />
            </div>
          </>
        )}
        <div>
          <IconButton
            aria-label="ViewModule"
            onClick={handleRedirectionToLevels}
          >
            <ViewModuleIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="Replay" onClick={handleReplay}>
            <ReplayIcon fontSize="large" />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="FastForward"
            onClick={handleRedirectionToNextLevel}
          >
            <FastForwardIcon fontSize="large" />
          </IconButton>
        </div>
      </Paper>
    </Fade>
  );
}

GameResult.propTypes = {
  score: PropTypes.number,
  handleRedirectionToLevels: PropTypes.func.isRequired,
  handleRedirectionToNextLevel: PropTypes.func.isRequired,
  handleReplay: PropTypes.func.isRequired,
};

export default GameResult;
