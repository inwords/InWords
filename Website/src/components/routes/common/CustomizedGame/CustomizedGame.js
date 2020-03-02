import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'src/utils/shuffle';
import useDialog from 'src/hooks/useDialog';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Game from './Game';
import GameSettingsDialog from './GameSettingsDialog';
import GamePairsDialog from './GamePairsDialog';

import './CustomizedGame.css';

const synth = window.speechSynthesis;
const lang = 'en-US';

function CustomizedGame({
  trainingSettings,
  setTrainingSettings,
  trainingLevel,
  onNextLevel,
  ...rest
}) {
  const [processedTrainingLevel, setProcessedTrainingLevel] = React.useState();

  const [listOn, setListOn] = React.useState();

  const {
    open: openWordPairs,
    setOpen: setOpenWordPairs,
    handleClose: handleCloseWordPairs
  } = useDialog();

  React.useEffect(() => {
    const {
      listOn = true,
      cardDimension = 120,
      cardTextSize = 16,
      voiceOn = false
    } = trainingSettings;

    setListOn(listOn);

    setProcessedTrainingLevel({
      ...trainingLevel,
      wordTranslations: shuffle([...trainingLevel.wordTranslations]).slice(
        0,
        +trainingSettings.quantity || 8
      ),
      cardSettings: {
        cardDimension: +cardDimension,
        cardTextSize: +cardTextSize
      }
    });

    if (voiceOn) {
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
      <GameSettingsDialog
        open={openSettings}
        handleClose={handleCloseSettings}
        trainingSettings={trainingSettings}
        setTrainingSettings={setTrainingSettings}
      />
      {Boolean(processedTrainingLevel) && (
        <Fragment>
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
  setTrainingSettings: PropTypes.func.isRequired,
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
