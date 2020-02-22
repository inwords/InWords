import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrainingTypes from 'src/templates/TrainingTypes';

function DictionaryTrainings() {
  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  const history = useHistory();

  React.useEffect(() => {
    if (
      !trainingLevelsMap[-1] ||
      !trainingLevelsMap[-1].wordTranslations.length
    ) {
      history.push('/dictionary');
    }
  }, [trainingLevelsMap, history]);

  return (
    <TrainingTypes trainingLevel={trainingLevelsMap[-1] || { levelId: -1 }} />
  );
}

export default DictionaryTrainings;
