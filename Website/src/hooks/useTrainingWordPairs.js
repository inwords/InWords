import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingWordPairs } from 'src/actions/trainingApiActions';

export default function useTrainingWordPairs() {
  const { levelId, wordTranslations } = useSelector(
    store => store.training.trainingLevel
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (levelId !== 0) {
      dispatch(receiveTrainingWordPairs());
    }
  }, [levelId, dispatch]);

  return wordTranslations;
}
