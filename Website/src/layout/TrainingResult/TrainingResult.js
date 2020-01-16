import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import ReplayIcon from '@material-ui/icons/Replay';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FadeAnimation from 'src/components/FadeAnimation';
import Paper from 'src/components/Paper';
import IconButton from 'src/components/IconButton';
import Smiley from './Smiley';

import './TrainingResult.css';

function TrainingResult({ score, handleRedirectionToNextLevel, handleReplay }) {
  return (
    <FadeAnimation>
      <Paper className="training-result-paper">
        {score !== null && (
          <Fragment>
            <div className="training-result-smiley">
              <Smiley score={score} />
            </div>
            <div className="training-result-stars">
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
          </Fragment>
        )}
        <div>
          <IconButton aria-label="replay" onClick={handleReplay}>
            <ReplayIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="next level"
            onClick={handleRedirectionToNextLevel}
          >
            <FastForwardIcon fontSize="large" />
          </IconButton>
        </div>
      </Paper>
    </FadeAnimation>
  );
}

TrainingResult.propTypes = {
  score: PropTypes.number,
  handleRedirectionToNextLevel: PropTypes.func,
  handleReplay: PropTypes.func.isRequired
};

export default TrainingResult;
