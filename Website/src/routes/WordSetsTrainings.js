import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingLevel } from 'src/actions/trainingApiActions';
import TrainingTypes from 'src/templates/TrainingTypes';

function WordSetsTrainings() {
  const params = useParams();

  const dispatch = useDispatch();

  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  React.useEffect(() => {
    if (!trainingLevelsMap[params.levelId]) {
      dispatch(receiveTrainingLevel(params.levelId));
    }
  }, [trainingLevelsMap, params.levelId, dispatch]);

  return (
    <TrainingTypes
      trainingLevel={
        trainingLevelsMap[params.levelId] || { levelId: +params.levelId }
      }
    />
  );
}

WordSetsTrainings.propTypes = {
  level: PropTypes.number
};

export default WordSetsTrainings;
