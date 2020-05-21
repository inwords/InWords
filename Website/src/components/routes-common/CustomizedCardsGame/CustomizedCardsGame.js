import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadValue } from 'src/localStorage';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import Typography from 'src/components/core/Typography';
import Space from 'src/components/core/Space';
import ControlledCardsGameSettingsDialog from './ControlledCardsGameSettingsDialog';

function CustomizedCardsGame({
  title,
  component: Component,
  variations: { audible = false, sameLang = false } = {
    audible: false,
    sameLang: false
  },
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
            <ControlledCardsGameSettingsDialog
              trainingSettings={trainingSettings}
              setTrainingSettings={setTrainingSettings}
              voiceSettingEditable={!audible}
            />
          </Toolbar>
        </Paper>
        <Component
          variations={{
            audible,
            sameLang
          }}
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
  variations: PropTypes.shape({
    audible: PropTypes.bool,
    sameLang: PropTypes.bool
  }),
  isAudio: PropTypes.bool,
  trainingLevel: PropTypes.object.isRequired,
  handleEnd: PropTypes.func,
  internalName: PropTypes.string
};

export default CustomizedCardsGame;
