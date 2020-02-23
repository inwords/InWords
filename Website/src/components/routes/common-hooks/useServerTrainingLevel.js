import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingLevel } from 'src/actions/trainingApiActions';

export default function useServerTrainingLevel() {
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
  }, [trainingLevelsMap, dispatch, paramLevelId]);

  return (
    trainingLevelsMap[paramLevelId] || {
      levelId: paramLevelId,
      wordTranslations: []
    }
  );
}
