import React, { Fragment, useMemo } from 'react';
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
    title: 'Открытые карточки',
    internalName: 'openedCards'
  },
  {
    title: 'Открытые аудио-карточки I',
    internalName: 'openedAudioCards'
  },
  {
    title: 'Открытые аудио-карточки II',
    internalName: 'openedAudioCards2'
  },
  {
    title: 'Закрытые карточки',
    internalName: 'closedCards'
  },
  {
    title: 'Закрытые аудио-карточки I',
    internalName: 'closedAudioCards'
  },
  {
    title: 'Закрытые аудио-карточки II',
    internalName: 'closedAudioCards2'
  }
];

function TrainingResult({
  score,
  detailedScore,
  selectedTrainingTypes,
  handleNextLevel,
  handleReplay
}) {
  const sortedTrainingTypesInfo = useMemo(
    () =>
      trainingTypesInfo.sort(
        (a, b) =>
          selectedTrainingTypes.indexOf(a.internalName) -
          selectedTrainingTypes.indexOf(b.internalName)
      ),
    [selectedTrainingTypes]
  );

  return (
    <div className="training-result">
      <FadeAnimation>
        <Paper className="training-result-paper">
          {score != null && (
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
            <IconButton aria-label="повторить" onClick={handleReplay}>
              <Icon fontSize="large">replay</Icon>
            </IconButton>
            {handleNextLevel && (
              <IconButton
                aria-label="следующий уровень"
                onClick={handleNextLevel}
              >
                <Icon fontSize="large">fast_forward</Icon>
              </IconButton>
            )}
          </div>
        </Paper>
      </FadeAnimation>
      <FadeAnimation>
        <Paper className="training-result-paper">
          {sortedTrainingTypesInfo.map(
            ({ internalName, title }) =>
              detailedScore[internalName] != null && (
                <Fragment key={internalName}>
                  <Typography align="center">{title}</Typography>
                  <Stars
                    score={detailedScore[internalName].score}
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
  selectedTrainingTypes: PropTypes.arrayOf(PropTypes.string.isRequired),
  handleNextLevel: PropTypes.func,
  handleReplay: PropTypes.func.isRequired
};

export default TrainingResult;
