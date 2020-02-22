import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingLevel } from 'src/actions/trainingApiActions';
import TrainingTypes from 'src/components/routes/common/TrainingTypes';

function WordSetsTrainingTypes() {
  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  const dispatch = useDispatch();

  const params = useParams();

  const paramLevelId = +params.levelId;

  React.useEffect(() => {
    if (!trainingLevelsMap[paramLevelId]) {
      dispatch(receiveTrainingLevel(paramLevelId));
    }
  }, [trainingLevelsMap, paramLevelId, dispatch]);

  return (
    <TrainingTypes
      trainingLevel={
        trainingLevelsMap[paramLevelId] || { levelId: paramLevelId }
      }
    />
  );
}

export default WordSetsTrainingTypes;
