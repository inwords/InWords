import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveLevel } from 'src/actions/trainingApiActions';

export default function useServerTrainingLevel() {
  const levelsMap = useSelector(store => store.training.levelsMap);

  const dispatch = useDispatch();

  const params = useParams();

  const paramLevelId = +params.levelId;

  React.useEffect(() => {
    if (!levelsMap[paramLevelId]) {
      dispatch(receiveLevel(paramLevelId));
    }
  }, [levelsMap, dispatch, paramLevelId]);

  return (
    levelsMap[paramLevelId] || {
      levelId: paramLevelId,
      wordTranslations: []
    }
  );
}
