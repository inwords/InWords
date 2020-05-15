import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import CustomizedTrainingWrapper from 'src/components/routes-common/CustomizedTrainingWrapper';
import Game from './Game';
import ControlledGameSettingsDialog from './ControlledGameSettingsDialog';

function CustomizedGame({ trainingLevel, handleEnd }) {
  const [trainingSettings, setTrainingSettings] = useState({});

  useEffect(() => {
    setTrainingSettings(loadValue('trainingSettings-0') || {});
  }, []);

  const [processedTrainingLevel, setProcessedTrainingLevel] = useState();

  useEffect(() => {
    setProcessedTrainingLevel({
      ...trainingLevel,
      cardSettings: {
        cardDimension: +trainingSettings.cardDimension || 120,
        cardTextSize: +trainingSettings.cardTextSize || 16
      },
      voiceOn: trainingSettings.voiceOn || false
    });
  }, [trainingLevel, trainingSettings]);

  return (
    <CustomizedTrainingWrapper
      title="Закрытые карточки"
      rightToolbarNodes={[
        <ControlledGameSettingsDialog
          key={0}
          trainingSettings={trainingSettings}
          setTrainingSettings={setTrainingSettings}
        />
      ]}
    >
      {Boolean(processedTrainingLevel) && (
        <Game trainingLevel={processedTrainingLevel} handleEnd={handleEnd} />
      )}
    </CustomizedTrainingWrapper>
  );
}

CustomizedGame.propTypes = {
  trainingLevel: PropTypes.shape({
    levelId: PropTypes.number.isRequired,
    wordTranslations: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired,
        onSpeech: PropTypes.func
      }).isRequired
    ).isRequired
  }).isRequired,
  handleEnd: PropTypes.func
};

export default CustomizedGame;
