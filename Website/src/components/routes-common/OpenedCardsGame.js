import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useCardsGame from 'src/components/routes-common/useCardsGame';
import CardsGameField from 'src/components/routes-common/CardsGameField';
import TrainingCard from 'src/components/routes-common/TrainingCard';
import TrainingCardValue from 'src/components/routes-common/TrainingCardValue';

const CARDS_CLOSING_DELAY = 700;
const CARDS_RESET_DELAY = 500;
const GAME_COMPLETION_DELAY = 300;

function OpenedCardsGame({
  trainingLevel,
  trainingSettings,
  handleEnd,
  variations: { audible, sameLang },
  internalName
}) {
  const {
    wordPairs,
    selectedWordPairs,
    setSelectedWordPairs,
    rightSelectedPairId,
    setRightSelectedPairId,
    completedPairIdsMap,
    setCompletedPairIdsMap,
    metrics,
    setMetrics,
    isGameCompleted
  } = useCardsGame(trainingLevel.wordTranslations, { sameLang });

  const successTimer = useRef(null);
  const failureTimer = useRef(null);

  const completeGame = metrics => {
    setTimeout(() => {
      handleEnd(internalName, metrics);
    }, GAME_COMPLETION_DELAY);
  };

  const handleClick = (pairId, id, onSpeech) => () => {
    let actualSelectedWordPairs = selectedWordPairs;
    let actualCompletedPairIdsMap = completedPairIdsMap;
    if (successTimer.current) {
      clearTimeout(successTimer.current);
      successTimer.current = null;

      actualSelectedWordPairs = [];
      setSelectedWordPairs(actualSelectedWordPairs);

      actualCompletedPairIdsMap = {
        ...completedPairIdsMap,
        [rightSelectedPairId]: true
      };
      setCompletedPairIdsMap(actualCompletedPairIdsMap);
      if (isGameCompleted(actualCompletedPairIdsMap)) {
        completeGame(metrics);
        return;
      }
    } else if (failureTimer.current) {
      clearTimeout(failureTimer.current);
      failureTimer.current = null;

      actualSelectedWordPairs = [];
      setSelectedWordPairs(actualSelectedWordPairs);
    }

    if (actualCompletedPairIdsMap[pairId]) {
      setSelectedWordPairs([]);
      return;
    }

    if ((trainingSettings.voiceOn || audible) && onSpeech) {
      onSpeech();
    }

    if (
      actualSelectedWordPairs.length &&
      actualSelectedWordPairs[0].id === id
    ) {
      return;
    }

    let newMetrics = metrics;
    if (actualSelectedWordPairs.length < 2) {
      setRightSelectedPairId(-1);
      setSelectedWordPairs(actualSelectedWordPairs.concat({ id, pairId }));

      newMetrics = {
        ...metrics,
        [pairId]: metrics[pairId] ? metrics[pairId] + 1 : 1
      };
      setMetrics(newMetrics);
    }

    if (actualSelectedWordPairs.length === 1) {
      if (actualSelectedWordPairs[0].pairId === pairId) {
        setRightSelectedPairId(pairId);

        successTimer.current = setTimeout(() => {
          setSelectedWordPairs([]);

          const newCompletedPairIdsMap = {
            ...actualCompletedPairIdsMap,
            [pairId]: true
          };
          setCompletedPairIdsMap(newCompletedPairIdsMap);

          if (isGameCompleted(newCompletedPairIdsMap)) {
            completeGame(metrics);
          }
        }, CARDS_CLOSING_DELAY);
      } else {
        failureTimer.current = setTimeout(() => {
          setSelectedWordPairs([]);
        }, CARDS_RESET_DELAY);
      }
    }
  };

  return (
    <CardsGameField
      cardDimension={+trainingSettings.cardDimension}
      numberOfCards={wordPairs.length}
    >
      {wordPairs.map(({ id, pairId, word, onSpeech }) => (
        <TrainingCard
          key={id}
          data-testid={`card-${pairId}-${word}`}
          open={!completedPairIdsMap[pairId]}
          color={rightSelectedPairId === pairId ? 'success' : null}
          dimension={+trainingSettings.cardDimension}
          textSize={+trainingSettings.cardTextSize}
          margin={4}
          onClick={handleClick(pairId, id, onSpeech)}
          depthShadow={
            selectedWordPairs.find(wordInfo => wordInfo.id === id) ? 64 : 4
          }
        >
          <TrainingCardValue
            word={word}
            onSpeech={onSpeech}
            audible={audible}
          />
        </TrainingCard>
      ))}
    </CardsGameField>
  );
}

OpenedCardsGame.propTypes = {
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
  trainingSettings: PropTypes.exact({
    cardDimension: PropTypes.string.isRequired,
    cardTextSize: PropTypes.string.isRequired,
    voiceOn: PropTypes.bool.isRequired
  }).isRequired,
  handleEnd: PropTypes.func.isRequired,
  variations: PropTypes.shape({
    audible: PropTypes.bool.isRequired,
    sameLang: PropTypes.bool.isRequired
  }).isRequired,
  internalName: PropTypes.string.isRequired
};

export default OpenedCardsGame;
