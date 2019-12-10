import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingWordPairs } from 'src/actions/trainingApiActions';

export default function useTrainingWordPairs() {
  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!trainingLevelsMap[0]) {
      dispatch(receiveTrainingWordPairs());
    }
  }, [trainingLevelsMap, dispatch]);

  return (trainingLevelsMap[0] && trainingLevelsMap[0].wordTranslations) || [];
}
