import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import shuffle from 'src/utils/shuffle';
import createSpeech from 'src/utils/createSpeech';
import { setSnackbar } from 'src/actions/commonActions';
import { saveLevelResult } from 'src/actions/trainingApiActions';
import TrainingResult from 'src/components/routes-common/TrainingResult';
import CustomizedCardsGame from 'src/components/routes-common/CustomizedCardsGame';
import ClosedCardsGame from 'src/components/routes-common/ClosedCardsGame';
import OpenedCardsGame from 'src/components/routes-common/OpenedCardsGame';
import TrainingPairsDialog from './TrainingPairsDialog';

function TrainingsConveyor({
  selectedTrainingTypes = ['openedCards', 'closedCards'],
  trainingsSettings = { quantity: '8', listOn: false },
  trainingLevel,
  handleNextLevel = () => {},
  handleResultSuccess = () => {}
}) {
  const [processedTrainingLevel, setProcessedTrainingLevel] = useState(null);
  const [restTrainingTypes, setRestTrainingTypes] = useState(
    selectedTrainingTypes
  );

  useEffect(() => {
    setProcessedTrainingLevel({
      ...trainingLevel,
      wordTranslations: shuffle(trainingLevel.wordTranslations)
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
      setDetailedScore(levelResult);
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
    setRestTrainingTypes(selectedTrainingTypes);

    if (trainingsSettings.listOn) {
      handleOpen();
    }
  };

  return (
    processedTrainingLevel &&
    processedTrainingLevel.wordTranslations.length > 0 &&
    (!resultReady ? (
      <Fragment>
        {!open &&
          (() => {
            const basicProps = {
              trainingLevel: processedTrainingLevel,
              handleEnd: handleTrainingEnd
            };

            switch (restTrainingTypes[0]) {
              case 'openedAudioCards':
                return (
                  <CustomizedCardsGame
                    key="openedAudioCards"
                    title="Открытые аудио-карточки I"
                    component={OpenedCardsGame}
                    variations={{
                      audible: true,
                      sameLang: true
                    }}
                    internalName="openedAudioCards"
                    {...basicProps}
                  />
                );
              case 'openedCards':
                return (
                  <CustomizedCardsGame
                    key="openedCards"
                    title="Открытые карточки"
                    component={OpenedCardsGame}
                    internalName="openedCards"
                    {...basicProps}
                  />
                );
              case 'openedAudioCards2':
                return (
                  <CustomizedCardsGame
                    key="openedAudioCards2"
                    title="Открытые аудио-карточки II"
                    component={OpenedCardsGame}
                    variations={{
                      audible: true
                    }}
                    internalName="openedAudioCards2"
                    {...basicProps}
                  />
                );
              case 'closedAudioCards':
                return (
                  <CustomizedCardsGame
                    key="closedAudioCards"
                    title="Закрытые аудио-карточки I"
                    component={ClosedCardsGame}
                    variations={{
                      audible: true,
                      sameLang: true
                    }}
                    internalName="closedAudioCards"
                    {...basicProps}
                  />
                );
              case 'closedCards':
                return (
                  <CustomizedCardsGame
                    key="closedCards"
                    title="Закрытые карточки"
                    component={ClosedCardsGame}
                    internalName="closedCards"
                    {...basicProps}
                  />
                );
              case 'closedAudioCards2':
                return (
                  <CustomizedCardsGame
                    key="closedAudioCards2"
                    title="Закрытые аудио-карточки II"
                    component={ClosedCardsGame}
                    variations={{
                      audible: true
                    }}
                    internalName="closedAudioCards2"
                    {...basicProps}
                  />
                );
              default:
                return null;
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
        selectedTrainingTypes={selectedTrainingTypes}
        handleNextLevel={handleEnhancedNextLevel}
        handleReplay={handleReplay}
      />
    ))
  );
}

TrainingsConveyor.propTypes = {
  selectedTrainingTypes: PropTypes.arrayOf(PropTypes.string.isRequired),
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
