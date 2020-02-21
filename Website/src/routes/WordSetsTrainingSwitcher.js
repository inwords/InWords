import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateLevelResult } from 'src/actions/trainingActions';
import TrainingSwitcher from 'src/templates/TrainingSwitcher';

function WordSetsTrainingSwitcher({ ...rest }) {
  const history = useHistory();
  const params = useParams();

  const dispatch = useDispatch();

  const onGameEnd = ({ levelResult }) => {
    dispatch(updateLevelResult(levelResult));
  };

  const trainingCategory = useSelector(
    store => store.training.trainingCategory
  );

  const onNextLevel = () => {
    const currentLevelIndex = trainingCategory.levelsInfo.findIndex(
      ({ levelId }) => levelId === +params.levelId
    );

    if (currentLevelIndex !== -1) {
      const nextLevelIndex = currentLevelIndex + 1;
      const nextLevel = trainingCategory.levelsInfo[nextLevelIndex];

      if (nextLevel.levelId) {
        history.push(
          `/dictionary/sets/training/${params.categoryId}/${nextLevel.levelId}/${params.trainingId}`
        );
      }
    } else {
      history.push('/dictionary/sets');
    }
  };

  return (
    <TrainingSwitcher
      onGameEnd={onGameEnd}
      onNextLevel={onNextLevel}
      {...rest}
    />
  );
}

export default WordSetsTrainingSwitcher;
