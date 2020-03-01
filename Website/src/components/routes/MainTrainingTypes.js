import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingWordPairs } from 'src/actions/trainingApiActions';
import TrainingTypes from 'src/components/routes/common/TrainingTypes';

function MainTrainingTypes() {
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

MainTrainingTypes.propTypes = {
  level: PropTypes.number
};

export default MainTrainingTypes;
