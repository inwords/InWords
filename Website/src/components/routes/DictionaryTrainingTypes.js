import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TrainingTypes from 'src/components/routes/common/TrainingTypes';

function DictionaryTrainingTypes() {
  const levelsMap = useSelector(store => store.wordSet.levelsMap);

  const history = useHistory();

  React.useEffect(() => {
    if (!levelsMap[-1] || !levelsMap[-1].wordTranslations.length) {
      history.push('/dictionary');
    }
  }, [levelsMap, history]);

  return <TrainingTypes trainingLevel={levelsMap[-1] || { levelId: -1 }} />;
}

export default DictionaryTrainingTypes;
