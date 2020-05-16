import { useState, useEffect } from 'react';
import { loadValue } from 'src/localStorage';

export default function useTrainingsConfig() {
  const [selectedTrainingTypes, setSelectedTrainingTypes] = useState(null);
  const [trainingsSettings, setTrainingsSettings] = useState(null);

  useEffect(() => {
    setSelectedTrainingTypes(loadValue('selectedTrainingTypes') || [0, 1]);

    const { quantity = '8', listOn = false } =
      loadValue('trainingsSettings') || {};
    setTrainingsSettings({ quantity, listOn });
  }, []);

  return { selectedTrainingTypes, trainingsSettings };
}
