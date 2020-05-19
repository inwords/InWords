import { useState, useEffect } from 'react';
import { loadValue } from 'src/localStorage';

const useTrainingsConfig = () => {
  const [selectedTrainingTypes, setSelectedTrainingTypes] = useState(null);
  const [trainingsSettings, setTrainingsSettings] = useState(null);

  useEffect(() => {
    setSelectedTrainingTypes(
      loadValue('selectedTrainingTypes') || [
        'audition',
        'openedCards',
        'closedCards'
      ]
    );

    const { quantity = '8', listOn = false } =
      loadValue('trainingsSettings') || {};
    setTrainingsSettings({ quantity, listOn });
  }, []);

  return { selectedTrainingTypes, trainingsSettings };
};

export default useTrainingsConfig;
