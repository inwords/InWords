import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'src/utils/shuffle';
import createSpeech from 'src/utils/createSpeech';
import useDialog from 'src/components/core/useDialog';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Game from './Game';
import GamePairsDialog from './GamePairsDialog';
import ControlledGameSettingsDialog from './ControlledGameSettingsDialog';

import './CustomizedGame.css';

function CustomizedGame({
  trainingSettings,
  setTrainingSettings,
  trainingLevel,
  handleNextLevel = () => {},
  handleResultSuccess = () => {}
}) {
  const [processedTrainingLevel, setProcessedTrainingLevel] = useState();

  useEffect(() => {
    setProcessedTrainingLevel(processedTrainingLevel => ({
      ...processedTrainingLevel,
      levelId: trainingLevel.levelId,
      wordTranslations: shuffle([...trainingLevel.wordTranslations])
        .slice(0, +trainingSettings.quantity || 8)
        .map(wordTranslation => ({
          ...wordTranslation,
          onSpeech: createSpeech(wordTranslation.wordForeign)
        }))
    }));
  }, [trainingSettings.quantity, trainingLevel]);

  useEffect(() => {
    setProcessedTrainingLevel(processedTrainingLevel => ({
      ...processedTrainingLevel,
      cardSettings: {
        cardDimension: +trainingSettings.cardDimension || 120,
        cardTextSize: +trainingSettings.cardTextSize || 16
      }
    }));
  }, [trainingSettings.cardDimension, trainingSettings.cardTextSize]);

  useEffect(() => {
    setProcessedTrainingLevel(processedTrainingLevel => ({
      ...processedTrainingLevel,
      voiceOn: trainingSettings.voiceOn || false
    }));
  }, [trainingSettings.voiceOn]);

  const {
    open: openWordPairs,
    handleOpen: handleOpenWordPairs,
    handleClose: handleCloseWordPairs
  } = useDialog(trainingSettings.listOn);

  const [listOn, setListOn] = useState(trainingSettings.listOn);

  useEffect(() => {
    setListOn(trainingSettings.listOn);
  }, [trainingSettings.listOn]);

  const handleShuffle = () => {
    setProcessedTrainingLevel(processedTrainingLevel => ({
      ...trainingLevel,
      ...processedTrainingLevel,
      wordTranslations: shuffle([...trainingLevel.wordTranslations])
        .slice(0, +trainingSettings.quantity || 8)
        .map(wordTranslation => ({
          ...wordTranslation,
          onSpeech: createSpeech(wordTranslation.wordForeign)
        }))
    }));

    if (listOn) {
      handleOpenWordPairs();
    }
  };

  const handleEnhancedNextLevel = (...params) => {
    handleNextLevel(...params);

    if (listOn) {
      handleOpenWordPairs();
    }
  };

  const handleReplay = () => {
    if (listOn) {
      handleOpenWordPairs();
    }
  };

  return (
    <Fragment>
      <Paper>
        <Toolbar variant="dense" className="game-settings-toolbar">
          <ControlledGameSettingsDialog
            trainingSettings={trainingSettings}
            setTrainingSettings={setTrainingSettings}
          />
          <IconButton onClick={handleShuffle}>
            <Icon>shuffle</Icon>
          </IconButton>
        </Toolbar>
      </Paper>
      {Boolean(processedTrainingLevel) && (
        <Fragment>
          <Game
            trainingLevel={processedTrainingLevel}
            handleNextLevel={handleEnhancedNextLevel}
            handleReplay={handleReplay}
            handleResultSuccess={handleResultSuccess}
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
  handleNextLevel: PropTypes.func,
  handleResultSuccess: PropTypes.func
};

export default CustomizedGame;
