import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingCategories } from 'src/actions/trainingApiActions';
import TrainingCategories from './TrainingCategories';

function TrainingCategoriesContainer() {
  const trainingCategories = useSelector(
    store => store.training.trainingCategories
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!trainingCategories.length) {
      dispatch(receiveTrainingCategories());
    }
  }, [trainingCategories.length, dispatch]);

  return <TrainingCategories trainingCategories={trainingCategories} />;
}

export default TrainingCategoriesContainer;
