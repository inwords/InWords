import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingCategory } from 'src/actions/trainingApiActions';
import TrainingLevels from './TrainingLevels';

function TrainingLevelsContainer() {
  const trainingCategory = useSelector(
    store => store.training.trainingCategory
  );

  const params = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (
      !trainingCategory.trainingId ||
      trainingCategory.trainingId !== +params.categoryId
    ) {
      dispatch(receiveTrainingCategory(params.categoryId));
    }
  }, [trainingCategory, dispatch, params.categoryId]);

  return (
    trainingCategory.trainingId === +params.categoryId && (
      <TrainingLevels trainingCategory={trainingCategory} />
    )
  );
}

export default TrainingLevelsContainer;
