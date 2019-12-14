import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingCategories } from './node_modules/src/actions/trainingApiActions';
import WordSets from './WordSets';

function WordSetsContainer() {
  const trainingCategories = useSelector(
    store => store.training.trainingCategories
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!trainingCategories.length) {
      dispatch(receiveTrainingCategories());
    }
  }, [trainingCategories.length, dispatch]);

  return <WordSets trainingCategories={trainingCategories} />;
}

export default WordSetsContainer;
