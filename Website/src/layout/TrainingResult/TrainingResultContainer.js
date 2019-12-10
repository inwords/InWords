import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeTrainingLevelWordPairs } from 'src/actions/trainingActions';
import TrainingResult from './TrainingResult';

function TrainingResultContainer({ wordPairs, handleReplay, ...rest }) {
  const params = useParams();
  const history = useHistory();

  const { recentTrainings } = useSelector(
    store => store.training.trainingHistory
  );
  const dispatch = useDispatch();

  const paramLevelId = +params.levelId;
  const paramTrainingId = +params.trainingId;

  const handleRedirectionToNextLevel = () => {
    if (paramLevelId === 0 || paramLevelId === -1) {
      dispatch(
        removeTrainingLevelWordPairs(
          paramLevelId,
          wordPairs.map(wordPair => wordPair.pairId)
        )
      );

      setTimeout(() => {
        handleReplay();
      }, 0);
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
        history.push('/training');
      }
    }

    // const levelIndex = levelsInfo.findIndex(
    //   levelInfo => levelInfo.levelId === paramLevelId
    // );

    // const handleRedirectionToLevels = () => {
    //   history.push(`/training/themes/${paramCategoryId}/${paramTrainingId}`);
    // };

    // if (levelIndex !== -1) {
    //   const nextLevelIndex = levelIndex + 1;
    //   if (levelsInfo[nextLevelIndex]) {
    //     history.push(
    //       `/training/themes/${paramCategoryId}/${paramTrainingId}/${levelsInfo[nextLevelIndex].levelId}`
    //     );
    //   } else {
    //     handleRedirectionToLevels();
    //   }
    // } else {
    //   handleRedirectionToLevels();
    // }
  };

  return (
    <TrainingResult
      handleReplay={handleReplay}
      handleRedirectionToNextLevel={handleRedirectionToNextLevel}
      {...rest}
    />
  );
}

export default TrainingResultContainer;
