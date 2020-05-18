import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import CustomizedTrainingWrapper from 'src/components/routes-common/CustomizedTrainingWrapper';
import ControlledTrainingSettingsDialog from 'src/components/routes-common/ControlledTrainingSettingsDialog';
import CardsGame from './CardsGame';
import CardsGameSettingsDialog from './CardsGameSettingsDialog';

function CustomizedCardsGame(props) {
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
          <ControlledTrainingSettingsDialog
            key={0}
            component={CardsGameSettingsDialog}
            trainingSettings={trainingSettings}
            setTrainingSettings={setTrainingSettings}
          />
        ]}
      >
        <CardsGame trainingSettings={trainingSettings} {...props} />
      </CustomizedTrainingWrapper>
    )
  );
}

CustomizedCardsGame.propTypes = {
  trainingLevel: PropTypes.object.isRequired,
  handleEnd: PropTypes.func
};

export default CustomizedCardsGame;
