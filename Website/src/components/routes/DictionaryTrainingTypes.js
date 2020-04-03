import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrainingTypes from 'src/components/routes-common/TrainingTypes';

function DictionaryTrainingTypes() {
  const levelsMap = useSelector(store => store.wordSet.levelsMap);

  const history = useHistory();

  const trainingLevel = levelsMap[-1];
  useEffect(() => {
    if (!trainingLevel || !trainingLevel.wordTranslations.length) {
      history.push('/dictionary');
    }
  }, [trainingLevel, history]);

  return <TrainingTypes trainingLevel={trainingLevel || { levelId: -1 }} />;
}

export default DictionaryTrainingTypes;
