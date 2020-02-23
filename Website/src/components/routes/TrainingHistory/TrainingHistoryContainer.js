import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingHistory } from 'src/actions/trainingApiActions';
import TrainingHistory from './TrainingHistory';

function TrainingHistoryContainer({ ...rest }) {
  const { actual, recentTrainings } = useSelector(
    store => store.training.trainingHistory
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!actual) {
      dispatch(receiveTrainingHistory());
    }
  }, [actual, dispatch]);

  return <TrainingHistory recentTrainings={recentTrainings} {...rest} />;
}

export default TrainingHistoryContainer;
