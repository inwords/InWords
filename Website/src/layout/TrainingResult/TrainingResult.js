import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/Icon';
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
              {Array(score).fill(
                <Icon fontSize="large" color="gold">
                  star
                </Icon>
              )}
              {Array(3 - score).fill(
                <Icon fontSize="large" color="disabled">
                  star
                </Icon>
              )}
            </div>
          </Fragment>
        )}
        <div>
          <IconButton aria-label="replay" onClick={handleReplay}>
            <Icon fontSize="large">replay</Icon>
          </IconButton>
          <IconButton
            aria-label="next level"
            onClick={handleRedirectionToNextLevel}
          >
            <Icon fontSize="large">fast_forward</Icon>
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
