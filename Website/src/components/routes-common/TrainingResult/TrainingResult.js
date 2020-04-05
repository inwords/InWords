import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/core/Icon';
import FadeAnimation from 'src/components/core/FadeAnimation';
import Paper from 'src/components/core/Paper';
import IconButton from 'src/components/core/IconButton';
import Smiley from './Smiley';

import './TrainingResult.css';

function TrainingResult({ score, colorPair, handleNextLevel, handleReplay }) {
  return (
    <FadeAnimation>
      <Paper className="training-result-paper">
        {score !== null && (
          <Fragment>
            <div className="training-result-smiley">
              <Smiley score={score} colorPair={colorPair} />
            </div>
            <div className="training-result-stars">
              <Icon color={score > 0 ? 'gold' : 'disabled'} fontSize="large">
                star
              </Icon>
              <Icon color={score > 1 ? 'gold' : 'disabled'} fontSize="large">
                star
              </Icon>
              <Icon color={score > 2 ? 'gold' : 'disabled'} fontSize="large">
                star
              </Icon>
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
  colorPair: PropTypes.array,
  handleNextLevel: PropTypes.func,
  handleReplay: PropTypes.func.isRequired
};

export default TrainingResult;
