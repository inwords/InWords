import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

export default function useClientTrainingLevel(redirectionURL) {
  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  const history = useHistory();
  const params = useParams();

  const paramLevelId = +params.levelId;

  React.useEffect(() => {
    if (!trainingLevelsMap[paramLevelId]) {
      history.push(redirectionURL);
    }
  }, [trainingLevelsMap, paramLevelId, history, redirectionURL]);

  return (
    trainingLevelsMap[paramLevelId] || {
      levelId: paramLevelId,
      wordTranslations: []
    }
  );
}
