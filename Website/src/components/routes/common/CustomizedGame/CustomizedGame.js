import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'src/utils/shuffle';
import useDialog from 'src/hooks/useDialog';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import CardSettingsContext from 'src/components/routes/common/CardSettingsContext';
import Game from './Game';
import TrainingSettingsDialog from './TrainingSettingsDialog';
import GamePairsDialog from './GamePairsDialog';

import './CustomizedGame.css';

const synth = window.speechSynthesis;
const lang = 'en-US';

function CustomizedGame({
  trainingSettings,
  trainingLevel,
  onNextLevel,
  ...rest
}) {
  const [cardSettings, setCardSettings] = React.useState({
    cardDimension: 120,
    cardTextSize: 16
  });

  const [processedTrainingLevel, setProcessedTrainingLevel] = React.useState();

  const [listOn, setListOn] = React.useState();

  const {
    open: openWordPairs,
    setOpen: setOpenWordPairs,
    handleClose: handleCloseWordPairs
  } = useDialog();

  React.useEffect(() => {
    setCardSettings({
      cardDimension: +trainingSettings.cardDimension || 120,
      cardTextSize: +trainingSettings.cardTextSize || 16
    });

    setListOn(
      trainingSettings.listOn !== undefined ? trainingSettings.listOn : true
    );

    setProcessedTrainingLevel({
      ...trainingLevel,
      wordTranslations: shuffle([...trainingLevel.wordTranslations]).slice(
        0,
        trainingSettings.quantity || 8
      )
    });

    if (trainingSettings.voiceOn) {
      setProcessedTrainingLevel(processedTrainingLevel => ({
        ...processedTrainingLevel,
        wordTranslations: processedTrainingLevel.wordTranslations.map(
          wordTranslation => {
            const onSpeech = () => {
              if (synth.speaking) {
                synth.cancel();
              }

              const speech = new SpeechSynthesisUtterance(
                wordTranslation.wordForeign
              );
              speech.lang = lang;
              synth.speak(speech);
            };

            return {
              ...wordTranslation,
              onSpeech
            };
          }
        )
      }));
    }
  }, [trainingSettings, trainingLevel]);

  React.useEffect(() => {
    if (listOn) {
      setOpenWordPairs(true);
    }
  }, [listOn, setOpenWordPairs]);

  const {
    open: openSettings,
    handleOpen: handleOpenSettings,
    handleClose: handleCloseSettings
  } = useDialog();

  return (
    <Fragment>
      <Paper>
        <Toolbar variant="dense" className="game-settings-toolbar">
          <IconButton onClick={handleOpenSettings} edge="start">
            <Icon>settings</Icon>
          </IconButton>
        </Toolbar>
      </Paper>
      <TrainingSettingsDialog
        open={openSettings}
        handleClose={handleCloseSettings}
      />
      {Boolean(processedTrainingLevel) && (
        <Fragment>
          <CardSettingsContext.Provider value={cardSettings}>
            <Game
              trainingLevel={processedTrainingLevel}
              onNextLevel={() => {
                onNextLevel();

                if (listOn) {
                  setOpenWordPairs(true);
                }
              }}
              {...rest}
            />
          </CardSettingsContext.Provider>
          <GamePairsDialog
            open={openWordPairs}
            handleClose={handleCloseWordPairs}
            wordPairs={processedTrainingLevel.wordTranslations}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

CustomizedGame.propTypes = {
  trainingSettings: PropTypes.shape({
    quantity: PropTypes.string,
    listOn: PropTypes.bool,
    cardDimension: PropTypes.string,
    cardTextSize: PropTypes.string
  }).isRequired,
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
  onNextLevel: PropTypes.func.isRequired
};

export default CustomizedGame;
