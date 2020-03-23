import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeHistory } from 'src/actions/trainingActions';
import { receiveHistory } from 'src/actions/trainingApiActions';
import TrainingHistory from './TrainingHistory';

function TrainingHistoryContainer() {
  const { actual, recentTrainings } = useSelector(
    store => store.training.history
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!actual) {
      (async () => {
        try {
          const data = await dispatch(receiveHistory());
          dispatch(initializeHistory(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить историю' }));
        }
      })();
    }
  }, [actual, dispatch]);

  return <TrainingHistory recentTrainings={recentTrainings} />;
}

export default TrainingHistoryContainer;
