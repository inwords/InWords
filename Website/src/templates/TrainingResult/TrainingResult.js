import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/Icon';
import FadeAnimation from 'src/components/FadeAnimation';
import Paper from 'src/components/Paper';
import IconButton from 'src/components/IconButton';
import Smiley from './Smiley';

import './TrainingResult.css';

function TrainingResult({ score, handleNextLevel, handleReplay }) {
  return (
    <FadeAnimation>
      <Paper className="training-result-paper">
        {score !== null && (
          <Fragment>
            <div className="training-result-smiley">
              <Smiley score={score} />
            </div>
            <div className="training-result-stars">
              <Icon color={score > 0 ? 'gold' : 'disabled'}>star</Icon>
              <Icon color={score > 1 ? 'gold' : 'disabled'}>star</Icon>
              <Icon color={score > 2 ? 'gold' : 'disabled'}>star</Icon>
            </div>
          </Fragment>
        )}
        <div>
          <IconButton aria-label="replay" onClick={handleReplay}>
            <Icon fontSize="large">replay</Icon>
          </IconButton>
          {handleNextLevel && (
            <IconButton aria-label="next level" onClick={handleNextLevel}>
              <Icon fontSize="large">fast_forward</Icon>
            </IconButton>
          )}
        </div>
      </Paper>
    </FadeAnimation>
  );
}

TrainingResult.propTypes = {
  score: PropTypes.number,
  handleNextLevel: PropTypes.func,
  handleReplay: PropTypes.func.isRequired
};

export default TrainingResult;
