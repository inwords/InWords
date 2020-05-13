import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeWordSetLevelPairs } from 'src/actions/wordSetActions';
import useTrainingsConfig from 'src/components/routes-common/useTrainingsConfig';
import useClientTrainingLevel from 'src/components/routes-common/useClientTrainingLevel';
import TrainingsConveyor from 'src/components/routes-common/TrainingsConveyor';

function MainTrainingConveyor({ redirectionUrl }) {
  const { selectedTrainingTypes, trainingsSettings } = useTrainingsConfig();

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
    Boolean(selectedTrainingTypes) && (
      <TrainingsConveyor
        selectedTrainingTypes={selectedTrainingTypes}
        trainingsSettings={trainingsSettings}
        handleNextLevel={handleNextLevel}
        trainingLevel={trainingLevel}
      />
    )
  );
}

MainTrainingConveyor.propTypes = {
  redirectionUrl: PropTypes.string.isRequired
};

export default MainTrainingConveyor;
