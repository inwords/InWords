import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingWordPairs } from 'src/actions/trainingApiActions';
import TrainingTypes from 'src/templates/TrainingTypes';

function MainTrainings() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!trainingLevelsMap[0]) {
      dispatch(receiveTrainingWordPairs());
    }
  }, [trainingLevelsMap, dispatch]);

  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  return (
    <TrainingTypes trainingLevel={trainingLevelsMap[0] || { levelId: 0 }} />
  );
}

MainTrainings.propTypes = {
  level: PropTypes.number
};

export default MainTrainings;
