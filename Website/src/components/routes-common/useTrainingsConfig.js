import { useState, useEffect } from 'react';
import { loadValue } from 'src/localStorage';

export default function useTrainingsConfig() {
  const [selectedTrainingTypes, setSelectedTrainingTypes] = useState([]);
  const [trainingsSettings, setTrainingsSettings] = useState({});

  useEffect(() => {
    setSelectedTrainingTypes(loadValue('selectedTrainingTypes') || []);

    const { quantity = '8', listOn = false } =
      loadValue('trainingsSettings') || {};
    setTrainingsSettings({ quantity, listOn });
  }, []);

  return { selectedTrainingTypes, trainingsSettings };
}
