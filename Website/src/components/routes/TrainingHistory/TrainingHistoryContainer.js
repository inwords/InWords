import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveHistory } from 'src/actions/trainingApiActions';
import TrainingHistory from './TrainingHistory';

function TrainingHistoryContainer({ ...rest }) {
  const { actual, recentTrainings } = useSelector(
    store => store.training.history
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!actual) {
      dispatch(receiveHistory());
    }
  }, [actual, dispatch]);

  return <TrainingHistory recentTrainings={recentTrainings} {...rest} />;
}

export default TrainingHistoryContainer;
