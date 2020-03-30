import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

export default function useClientTrainingLevel(redirectionURL) {
  const levelsMap = useSelector(store => store.wordSet.levelsMap);

  const history = useHistory();
  const params = useParams();

  const paramLevelId = +params.levelId;

  React.useEffect(() => {
    if (!levelsMap[paramLevelId]) {
      history.push(redirectionURL);
    }
  }, [levelsMap, paramLevelId, history, redirectionURL]);

  return (
    levelsMap[paramLevelId] || {
      levelId: paramLevelId,
      wordTranslations: []
    }
  );
}
