import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrainingResult from './TrainingResult';

function TrainingResultContainer({ history, match, ...rest }) {
  const { levelsInfo } = useSelector(store => store.training.trainingCategory);

  const paramLevelId = +match.params.levelId;
  const paramCategoryId = +match.params.categoryId;
  const paramTrainingId = +match.params.trainingId;

  const handleRedirectionToNextLevel = () => {
    if (paramLevelId === 0) {
      history.push('/dictionary');
      return;
    }

    const levelIndex = levelsInfo.findIndex(
      levelInfo => levelInfo.levelId === paramLevelId
    );

    const handleRedirectionToLevels = () => {
      history.push(`/trainings/${paramCategoryId}/${paramTrainingId}`);
    };

    if (levelIndex !== -1) {
      const nextLevelIndex = levelIndex + 1;
      if (levelsInfo[nextLevelIndex]) {
        history.push(
          `/trainings/${paramCategoryId}/${paramTrainingId}/${levelsInfo[nextLevelIndex].levelId}`
        );
      } else {
        handleRedirectionToLevels();
      }
    } else {
      handleRedirectionToLevels();
    }
  };

  return (
    <TrainingResult
      handleRedirectionToNextLevel={handleRedirectionToNextLevel}
      {...rest}
    />
  );
}

TrainingResultContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  score: PropTypes.number,
  handleReplay: PropTypes.func
};

export default withRouter(TrainingResultContainer);
