import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FadeAnimation from 'src/components/core/FadeAnimation';
import Paper from 'src/components/core/Paper';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Stars from 'src/components/routes-common/Stars';
import Typography from 'src/components/core/Typography';
import Smiley from './Smiley';

import './TrainingResult.css';

const trainingTypesInfo = [
  {
    title: 'Аудирование',
    internalName: 'audition'
  },
  {
    title: 'Закрытые карточки',
    internalName: 'cards'
  }
];

function TrainingResult({
  score,
  detailedScore,
  handleNextLevel,
  handleReplay
}) {
  return (
    <div className="training-result">
      <FadeAnimation>
        <Paper className="training-result-paper">
<<<<<<< HEAD
          {score != null && (
=======
          {score !== null && (
>>>>>>> develop
            <Fragment>
              <div className="training-result-smiley">
                <Smiley score={score} />
              </div>
              <Stars
                score={score}
                fontSize="large"
                className="training-result-stars"
              />
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
      <FadeAnimation>
        <Paper className="training-result-paper">
          {trainingTypesInfo.map(
            ({ internalName, title }) =>
<<<<<<< HEAD
              detailedScore[internalName] != null && (
                <Fragment key={internalName}>
                  <Typography variant="body1">{title}</Typography>
=======
              detailedScore[internalName] && (
                <Fragment key={internalName}>
                  <Typography variant="body1" className="training-result-name">
                    {title}
                  </Typography>
>>>>>>> develop
                  <Stars
                    score={detailedScore[internalName]}
                    fontSize="small"
                    className="training-result-stars"
                  />
                </Fragment>
              )
          )}
        </Paper>
      </FadeAnimation>
    </div>
  );
}

TrainingResult.propTypes = {
  score: PropTypes.number,
  detailedScore: PropTypes.shape({
    cards: PropTypes.number,
    audition: PropTypes.number
  }).isRequired,
  handleNextLevel: PropTypes.func,
  handleReplay: PropTypes.func.isRequired
};

export default TrainingResult;
