import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/core/Icon';
import FadeAnimation from 'src/components/core/FadeAnimation';
import Paper from 'src/components/core/Paper';
import IconButton from 'src/components/core/IconButton';
import Smiley from './Smiley';

import './TrainingResult.css';

const colorPairs = [
  ['#F44336', '#FFCDD2'],
  ['#E91E63', '#F8BBD0'],
  ['#9C27B0', '#E1BEE7'],
  ['#673AB7', '#D1C4E9'],
  ['#3F51B5', '#C5CAE9'],
  ['#2196F3', '#BBDEFB'],
  ['#03A9F4', '#B3E5FC'],
  ['#00BCD4', '#B2EBF2'],
  ['#009688', '#B2DFDB'],
  ['#4CAF50', '#C8E6C9'],
  ['#8BC34A', '#DCEDC8'],
  ['#CDDC39', '#F0F4C3'],
  ['#FFC107', '#FFECB3'],
  ['#FF9800', '#FFE0B2'],
  ['#FF5722', '#FFCCBC']
];

const getRandomColorPair = () =>
  colorPairs[Math.floor(Math.random() * colorPairs.length)];

function TrainingResult({ score, handleNextLevel, handleReplay }) {
  const colorPair = useMemo(() => getRandomColorPair(), []);

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
  handleNextLevel: PropTypes.func,
  handleReplay: PropTypes.func.isRequired
};

export default TrainingResult;
