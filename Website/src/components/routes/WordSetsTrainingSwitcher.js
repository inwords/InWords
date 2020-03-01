import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateLevelResult } from 'src/actions/trainingActions';
import useServerTrainingLevel from 'src/components/routes/common-hooks/useServerTrainingLevel';
import TrainingSwitcher from 'src/components/routes/common/TrainingSwitcher';

function WordSetsTrainingSwitcher({ ...rest }) {
  const trainingLevel = useServerTrainingLevel();

  const dispatch = useDispatch();

  const onResult = ({ levelResult }) => {
    dispatch(updateLevelResult(levelResult));
  };

  const trainingCategory = useSelector(
    store => store.training.trainingCategory
  );

  const history = useHistory();
  const params = useParams();

  const onNextLevel = () => {
    const currentLevelIndex = trainingCategory.levelsInfo.findIndex(
      ({ levelId }) => levelId === +params.levelId
    );

    if (currentLevelIndex !== -1) {
      const nextLevelIndex = currentLevelIndex + 1;
      const nextLevel = trainingCategory.levelsInfo[nextLevelIndex];

      if (nextLevel) {
        history.push(
          `/dictionary/sets/training/${params.categoryId}/${nextLevel.levelId}/${params.trainingId}`
        );
        return;
      }
    }

    history.push('/dictionary/sets');
  };

  return (
    <TrainingSwitcher
      onResult={onResult}
      onNextLevel={onNextLevel}
      trainingLevel={trainingLevel}
      {...rest}
    />
  );
}

export default WordSetsTrainingSwitcher;
