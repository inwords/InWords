import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  receiveTrainingCategories,
  addCategoryWordsToDictionary
} from 'src/actions/trainingApiActions';
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

  const handleAddingInDictionary = categoryId => () => {
    dispatch(addCategoryWordsToDictionary(categoryId));
  };

  return (
    <WordSets
      trainingCategories={trainingCategories}
      handleAddingInDictionary={handleAddingInDictionary}
    />
  );
}

export default WordSetsContainer;
