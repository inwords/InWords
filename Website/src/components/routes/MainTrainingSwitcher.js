import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { loadValue } from 'src/localStorage';
import { removeWordSetLevelPairs } from 'src/actions/wordSetActions';
import useClientTrainingLevel from 'src/components/routes-common/useClientTrainingLevel';
import TrainingsConveyor from 'src/components/routes-common/TrainingsConveyor';

function MainTrainingSwitcher({ redirectionUrl }) {
  const [trainingsSettings, setTrainingsSettings] = useState({});

  useEffect(() => {
    const { quantity = '8', listOn = false } =
      loadValue('trainingsSettings') || {};

    setTrainingsSettings({ quantity, listOn });
  }, []);

  const trainingLevel = useClientTrainingLevel(redirectionUrl);

  const dispatch = useDispatch();

  const handleNextLevel = (levelId, wordPairs) => {
    dispatch(
      removeWordSetLevelPairs(
        levelId,
        wordPairs.map(wordPair => wordPair.serverId)
      )
    );
  };

  return (
    <TrainingsConveyor
      trainingsSettings={trainingsSettings}
      handleNextLevel={handleNextLevel}
      trainingLevel={trainingLevel}
    />
  );
}

MainTrainingSwitcher.propTypes = {
  redirectionUrl: PropTypes.string.isRequired
};

export default MainTrainingSwitcher;
