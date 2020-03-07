import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'src/utils/shuffle';
import createSpeech from 'src/utils/createSpeech';
import useDialog from 'src/hooks/useDialog';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Game from './Game';
import GameSettingsDialog from './GameSettingsDialog';
import GamePairsDialog from './GamePairsDialog';

import './CustomizedGame.css';

function CustomizedGame({
  trainingSettings,
  setTrainingSettings,
  trainingLevel,
  onNextLevel,
  ...rest
}) {
  const [processedTrainingLevel, setProcessedTrainingLevel] = React.useState();

  React.useEffect(() => {
    setProcessedTrainingLevel(processedTrainingLevel => ({
      ...trainingLevel,
      ...processedTrainingLevel,
      wordTranslations: shuffle([...trainingLevel.wordTranslations])
        .slice(0, +trainingSettings.quantity || 8)
        .map(wordTranslation => {
          return {
            ...wordTranslation,
            onSpeech: createSpeech(wordTranslation.wordForeign)
          };
        })
    }));
  }, [trainingSettings.quantity, trainingLevel]);

  React.useEffect(() => {
    setProcessedTrainingLevel(processedTrainingLevel => ({
      ...processedTrainingLevel,
      cardSettings: {
        cardDimension: +trainingSettings.cardDimension,
        cardTextSize: +trainingSettings.cardTextSize
      }
    }));
  }, [trainingSettings.cardDimension, trainingSettings.cardTextSize]);

  React.useEffect(() => {
    setProcessedTrainingLevel(processedTrainingLevel => ({
      ...processedTrainingLevel,
      voiceOn: trainingSettings.voiceOn
    }));
  }, [trainingSettings.voiceOn]);

  const {
    open: openWordPairs,
    handleOpen: handleOpenWordPairs,
    handleClose: handleCloseWordPairs
  } = useDialog(trainingSettings.listOn);

  const [listOn, setListOn] = React.useState(trainingSettings.listOn);

  React.useEffect(() => {
    setListOn(trainingSettings.listOn);
  }, [trainingSettings.listOn]);

  const {
    open: openSettings,
    handleOpen: handleOpenSettings,
    handleClose: handleCloseSettings
  } = useDialog();

  const handleShuffle = () => {
    setProcessedTrainingLevel(processedTrainingLevel => ({
      ...trainingLevel,
      ...processedTrainingLevel,
      wordTranslations: shuffle([...trainingLevel.wordTranslations])
        .slice(0, +trainingSettings.quantity || 8)
        .map(wordTranslation => {
          return {
            ...wordTranslation,
            onSpeech: createSpeech(wordTranslation.wordForeign)
          };
        })
    }));

    if (listOn) {
      handleOpenWordPairs();
    }
  };

  return (
    <Fragment>
      <Paper>
        <Toolbar variant="dense" className="game-settings-toolbar">
          <IconButton onClick={handleOpenSettings} edge="start">
            <Icon>settings</Icon>
          </IconButton>
          <IconButton onClick={handleShuffle}>
            <Icon>shuffle</Icon>
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
                handleOpenWordPairs();
              }
            }}
            onReplay={() => {
              if (listOn) {
                handleOpenWordPairs();
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
    voiceOn: PropTypes.bool,
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
