import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeTrainingLevel } from 'src/actions/trainingActions';
import useTrainingWordPairs from 'src/hooks/useTrainingWordPairs';

function TrainingLevelCreator() {
  const { actual } = useSelector(store => store.training.trainingWordPairs);
  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  const wordPairs = useTrainingWordPairs();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!trainingLevelsMap[0] && actual) {
      dispatch(
        initializeTrainingLevel({
          levelId: 0,
          wordTranslations: wordPairs
        })
      );
    }
  }, [trainingLevelsMap, actual, wordPairs, dispatch]);

  return null;
}

export default TrainingLevelCreator;
