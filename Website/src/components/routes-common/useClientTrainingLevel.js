import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const useClientTrainingLevel = redirectionUrl => {
  const levelsMap = useSelector(store => store.wordSet.levelsMap);

  const history = useHistory();
  const { levelId: paramLevelId } = useParams();

  useEffect(() => {
    const trainingLevel = levelsMap[paramLevelId];
    if (!trainingLevel || !trainingLevel.wordTranslations.length) {
      history.push(redirectionUrl);
    }
  }, [levelsMap, paramLevelId, history, redirectionUrl]);

  return (
    levelsMap[paramLevelId] || {
      levelId: +paramLevelId,
      wordTranslations: []
    }
  );
};

export default useClientTrainingLevel;
