import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import CustomizedTrainingWrapper from 'src/components/routes-common/CustomizedTrainingWrapper';
import Game from './Game';
import ControlledGameSettingsDialog from './ControlledGameSettingsDialog';

function CustomizedGame({ trainingLevel, handleEnd }) {
  const [trainingSettings, setTrainingSettings] = useState(null);

  useEffect(() => {
    const { cardDimension = '120', cardTextSize = '1', voiceOn = false } =
      loadValue('trainingSettings-0') || {};

    setTrainingSettings({ cardDimension, cardTextSize, voiceOn });
  }, []);

  return (
    trainingSettings && (
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
        <Game
          trainingLevel={trainingLevel}
          trainingSettings={trainingSettings}
          handleEnd={handleEnd}
        />
      </CustomizedTrainingWrapper>
    )
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
