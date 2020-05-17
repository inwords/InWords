import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import shuffle from 'src/utils/shuffle';
import createSpeech from 'src/utils/createSpeech';
import { setSnackbar } from 'src/actions/commonActions';
import { saveLevelResult } from 'src/actions/trainingApiActions';
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
  const [processedTrainingLevel, setProcessedTrainingLevel] = useState(null);
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

  const [finalMetrics, setFinalMetrics] = useState({});
  const [newServerLevelId, setNewServerLevelId] = useState(null);
  const [resultReady, setResultReady] = useState(false);
  const [score, setScore] = useState(null);
  const [detailedScore, setDetailedScore] = useState({});

  const handleTrainingEnd = async (title, metrics) => {
    const newFinalMetrics = {
      ...finalMetrics,
      [`${title}Metric`]: { wordIdOpenCount: metrics }
    };
    setFinalMetrics(newFinalMetrics);

    if (restTrainingTypes.length > 1) {
      setRestTrainingTypes(restTrainingTypes.slice(1));
      return;
    }

    const levelId = trainingLevel.levelId;
    const actualLevelId = newServerLevelId || levelId;

    try {
      const { scores } = await dispatch(
        saveLevelResult(actualLevelId, newFinalMetrics)
      );
      const levelResult = scores[0];
      setScore(levelResult.score);
      setDetailedScore({
        cards: levelResult.cardsStatus && levelResult.cardsStatus.score,
        audition: levelResult.auditionStatus && levelResult.auditionStatus.score
      });
      setNewServerLevelId(levelResult.gameLevelId);
      setResultReady(true);
      handleResultSuccess(levelResult);
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось сохранить результат' }));
      setResultReady(true);
    }
  };

  const resetTrainingResult = () => {
    setResultReady(false);
    setScore(null);
    setDetailedScore({});
  };

  const handleEnhancedNextLevel = () => {
    handleNextLevel(
      trainingLevel.levelId,
      processedTrainingLevel.wordTranslations
    );
    resetTrainingResult();
    setNewServerLevelId(null);
    setRestTrainingTypes(selectedTrainingTypes);

    if (trainingsSettings.listOn) {
      handleOpen();
    }
  };

  const handleReplay = () => {
    resetTrainingResult();
    setRestTrainingTypes([...selectedTrainingTypes].sort(compareByOrder));

    if (trainingsSettings.listOn) {
      handleOpen();
    }
  };

  return (
    processedTrainingLevel &&
    processedTrainingLevel.wordTranslations.length > 0 &&
    (!resultReady ? (
      <Fragment>
        {(() => {
          if (open) return null;

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
        detailedScore={detailedScore}
        handleNextLevel={handleEnhancedNextLevel}
        handleReplay={handleReplay}
      />
    ))
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
