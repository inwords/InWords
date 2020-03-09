import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingWordPairs } from 'src/actions/trainingApiActions';
import TrainingTypes from 'src/components/routes/common/TrainingTypes';

function MainTrainingTypes() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!levelsMap[0]) {
      dispatch(receiveTrainingWordPairs());
    }
  }, [levelsMap, dispatch]);

  const levelsMap = useSelector(store => store.training.levelsMap);

  return <TrainingTypes trainingLevel={levelsMap[0] || { levelId: 0 }} />;
}

MainTrainingTypes.propTypes = {
  level: PropTypes.number
};

export default MainTrainingTypes;
