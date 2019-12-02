import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingWordPairs } from 'src/actions/trainingApiActions';

export default function useTrainingWordPairs() {
  const { actual, wordPairs } = useSelector(
    store => store.training.trainingWordPairs
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!actual) {
      dispatch(receiveTrainingWordPairs());
    }
  }, [actual, wordPairs, dispatch]);

  return wordPairs;
}
