import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import Typography from 'src/components/core/Typography';
import Space from 'src/components/core/Space';
import ControlledTrainingSettingsDialog from 'src/components/routes-common/ControlledTrainingSettingsDialog';
import CardsGameSettingsDialog from 'src/components/routes-common//CardsGameSettingsDialog';

function CustomizedCardsGame({
  title,
  component: Component,
  variantions = { isAudio: false, isSameLang: false },
  ...rest
}) {
  const [trainingSettings, setTrainingSettings] = useState(null);

  useEffect(() => {
    const { cardDimension = '120', cardTextSize = '1', voiceOn = false } =
      loadValue('trainingSettings-*Cards') || {};

    setTrainingSettings({ cardDimension, cardTextSize, voiceOn });
  }, []);

  return (
    trainingSettings && (
      <Fragment>
        <Paper>
          <Toolbar variant="dense">
            <Typography variant="h6">{title}</Typography>
            <Space />
            <ControlledTrainingSettingsDialog
              component={CardsGameSettingsDialog}
              trainingSettings={trainingSettings}
              setTrainingSettings={setTrainingSettings}
              voiceSettingEditable={!variantions.isAudio}
            />
          </Toolbar>
        </Paper>
        <Component
          variantions={variantions}
          trainingSettings={trainingSettings}
          {...rest}
        />
      </Fragment>
    )
  );
}

CustomizedCardsGame.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  variantions: PropTypes.shape({
    isAudio: PropTypes.bool,
    isSameLang: PropTypes.bool
  }),
  isAudio: PropTypes.bool,
  trainingLevel: PropTypes.object.isRequired,
  handleEnd: PropTypes.func
};

export default CustomizedCardsGame;
