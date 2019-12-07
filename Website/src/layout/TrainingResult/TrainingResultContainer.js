import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrainingResult from './TrainingResult';

function TrainingResultContainer(props) {
  const params = useParams();
  const history = useHistory();

  const { levelsInfo } = useSelector(store => store.training.trainingCategory);

  const paramLevelId = +params.levelId;
  const paramCategoryId = +params.categoryId;
  const paramTrainingId = +params.trainingId;

  const handleRedirectionToNextLevel = () => {
    if (paramLevelId === 0) {
      history.push('/training');
      return;
    }

    const levelIndex = levelsInfo.findIndex(
      levelInfo => levelInfo.levelId === paramLevelId
    );

    const handleRedirectionToLevels = () => {
      history.push(`/training/themes/${paramCategoryId}/${paramTrainingId}`);
    };

    if (levelIndex !== -1) {
      const nextLevelIndex = levelIndex + 1;
      if (levelsInfo[nextLevelIndex]) {
        history.push(
          `/training/themes/${paramCategoryId}/${paramTrainingId}/${levelsInfo[nextLevelIndex].levelId}`
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
      {...props}
    />
  );
}

export default TrainingResultContainer;
