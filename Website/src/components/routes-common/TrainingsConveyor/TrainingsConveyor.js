import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import shuffle from 'src/utils/shuffle';
import createSpeech from 'src/utils/createSpeech';
import { setSnackbar } from 'src/actions/commonActions';
import {
  saveLevelResult,
  saveCustomLevelResult
} from 'src/actions/trainingApiActions';
import TrainingResult from 'src/components/routes-common/TrainingResult';
import CustomizedGame from 'src/components/routes-common/CustomizedGame';
import CustomizedAuditionTraining from 'src/components/routes-common/CustomizedAuditionTraining';
import TrainingPairsDialog from './TrainingPairsDialog';

const trainingsTypesOrderMap = {
  0: 1,
  1: 0
};

const compareByOrder = (a, b) =>
  trainingsTypesOrderMap[a] - trainingsTypesOrderMap[b];

function TrainingsConveyor({
  selectedTrainingTypes = [0, 1],
  trainingsSettings = { quantity: '8', listOn: false },
  trainingLevel,
  handleNextLevel = () => {},
  handleResultSuccess = () => {}
}) {
  const [processedTrainingLevel, setProcessedTrainingLevel] = useState();
  const [restTrainingTypes, setRestTrainingTypes] = useState(
    [...selectedTrainingTypes].sort(compareByOrder)
  );

  useEffect(() => {
    setProcessedTrainingLevel({
      ...trainingLevel,
      wordTranslations: shuffle([...trainingLevel.wordTranslations])
        .slice(0, +trainingsSettings.quantity)
        .map(wordTranslation => ({
          ...wordTranslation,
          onSpeech: createSpeech(wordTranslation.wordForeign)
        }))
    });
  }, [trainingsSettings.quantity, trainingLevel]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (trainingsSettings.listOn) {
      handleOpen();
    }
  }, [trainingsSettings.listOn]);

  const dispatch = useDispatch();

  const [newServerLevelId, setNewServerLevelId] = useState(null);
  const [resultReady, setResultReady] = useState(false);
  const [score, setScore] = useState(null);

  const handleTrainingEnd = async (trainingType, metrics) => {
    if (restTrainingTypes.length > 1) {
      setRestTrainingTypes(restTrainingTypes.slice(1));
      return;
    }

    const levelId = trainingLevel.levelId;
    const actualLevelId = newServerLevelId || levelId;

    try {
      // TODO
      if (!metrics) throw Error('API NOT IMPLEMENTED');

      const { points } = await dispatch(
        actualLevelId > 0
          ? saveLevelResult({
              gameLevelId: actualLevelId,
              wordIdOpenCount: metrics
            })
          : saveCustomLevelResult({ wordIdOpenCount: metrics })
      );
      const levelResult = points[0];
      setScore(levelResult.score);
      setNewServerLevelId(levelResult.levelId);
      setResultReady(true);
      handleResultSuccess(levelResult);
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось сохранить результат' }));
      setResultReady(true);
    }
  };

  const resetGameResult = () => {
    setResultReady(false);
    setScore(null);
  };

  const handleEnhancedNextLevel = () => {
    handleNextLevel(
      trainingLevel.levelId,
      processedTrainingLevel.wordTranslations
    );
    resetGameResult();
    setNewServerLevelId(null);
    setRestTrainingTypes(selectedTrainingTypes);

    if (trainingsSettings.listOn) {
      handleOpen();
    }
  };

  const handleReplay = () => {
    resetGameResult();
    setRestTrainingTypes([...selectedTrainingTypes].sort(compareByOrder));

    if (trainingsSettings.listOn) {
      handleOpen();
    }
  };

  if (!processedTrainingLevel) return null;

  return !resultReady ? (
    <Fragment>
      {(() => {
        switch (restTrainingTypes[0]) {
          case 0:
            return (
              <CustomizedGame
                trainingLevel={processedTrainingLevel}
                handleEnd={handleTrainingEnd}
              />
            );
          case 1:
            return (
              <CustomizedAuditionTraining
                trainingLevel={processedTrainingLevel}
                handleEnd={handleTrainingEnd}
              />
            );
        }
      })()}
      <TrainingPairsDialog
        open={open}
        handleClose={handleClose}
        wordPairs={processedTrainingLevel.wordTranslations}
      />
    </Fragment>
  ) : (
    <TrainingResult
      score={score}
      handleNextLevel={handleEnhancedNextLevel}
      handleReplay={handleReplay}
    />
  );
}

TrainingsConveyor.propTypes = {
  selectedTrainingTypes: PropTypes.arrayOf(PropTypes.number),
  trainingsSettings: PropTypes.shape({
    quantity: PropTypes.string,
    listOn: PropTypes.bool
  }),
  trainingLevel: PropTypes.shape({
    levelId: PropTypes.number.isRequired,
    wordTranslations: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  handleNextLevel: PropTypes.func,
  handleResultSuccess: PropTypes.func
};

export default TrainingsConveyor;
