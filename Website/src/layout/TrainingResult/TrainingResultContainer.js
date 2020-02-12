import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrainingResult from './TrainingResult';

function TrainingResultContainer({
  prepareToNextLevel,
  handleReplay,
  ...rest
}) {
  const params = useParams();
  const history = useHistory();

  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  const { recentTrainings } = useSelector(
    store => store.training.trainingHistory
  );

  const paramLevelId = +params.levelId;
  const paramTrainingId = +params.trainingId;

  const handleRedirectionToNextLevel = () => {
    if (paramLevelId <= 0) {
      if (
        !trainingLevelsMap[paramLevelId] ||
        !trainingLevelsMap[paramLevelId].wordTranslations.length
      ) {
        switch (paramLevelId) {
          case 0:
            history.push('/training');
            return;
          case -1:
            history.push('/dictionary');
            return;
          default:
        }
      }
    } else {
      const levelIndex = recentTrainings.findIndex(
        ({ levelId }) => levelId === paramLevelId
      );

      const nextLevelIndex = levelIndex + 1;
      if (recentTrainings[nextLevelIndex]) {
        history.push(
          `/training/history/${recentTrainings[nextLevelIndex].levelId}/${paramTrainingId}`
        );
      } else {
        history.push('/training/history');
      }
    }

    prepareToNextLevel();
  };

  return (
    <TrainingResult
      handleReplay={handleReplay}
      handleRedirectionToNextLevel={handleRedirectionToNextLevel}
      {...rest}
    />
  );
}

TrainingResultContainer.propTypes = {
  prepareToNextLevel: PropTypes.func.isRequired,
  handleReplay: PropTypes.func.isRequired
};

export default TrainingResultContainer;
