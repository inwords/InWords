import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useCardsGame from 'src/components/routes-common/useCardsGame';
import CardsGameField from 'src/components/routes-common/CardsGameField';
import TrainingCard from 'src/components/routes-common/TrainingCard';
import TrainingCardValue from 'src/components/routes-common/TrainingCardValue';

const CARD_CLOSING_DELAY = 700;
const GAME_COMPLETION_DELAY = 700;

function ClosedCardsGame({
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

  const failureTimer = useRef(null);

  const handleClick = (pairId, id, onSpeech) => () => {
    let actualSelectedWordPairs = selectedWordPairs;
    if (failureTimer.current) {
      clearTimeout(failureTimer.current);
      failureTimer.current = null;

      actualSelectedWordPairs = [];
      setSelectedWordPairs(actualSelectedWordPairs);
    }

    if ((trainingSettings.voiceOn || audible) && onSpeech) {
      onSpeech();
    }

    if (
      completedPairIdsMap[pairId] ||
      (actualSelectedWordPairs.length && actualSelectedWordPairs[0].id === id)
    ) {
      return;
    }

    let newMetrics = metrics;
    if (actualSelectedWordPairs.length < 2) {
      setRightSelectedPairId(-1);

      setSelectedWordPairs(
        actualSelectedWordPairs.concat({
          id,
          pairId
        })
      );

      newMetrics = {
        ...metrics,
        [pairId]: metrics[pairId] ? metrics[pairId] + 1 : 1
      };
      setMetrics(newMetrics);
    }

    if (actualSelectedWordPairs.length === 1) {
      if (actualSelectedWordPairs[0].pairId === pairId) {
        setSelectedWordPairs([]);

        const newCompletedPairIdsMap = {
          ...completedPairIdsMap,
          [pairId]: true
        };

        setCompletedPairIdsMap(newCompletedPairIdsMap);
        setRightSelectedPairId(pairId);

        if (isGameCompleted(newCompletedPairIdsMap)) {
          setTimeout(() => {
            handleEnd(internalName, newMetrics);
            return;
          }, GAME_COMPLETION_DELAY);
        }
      } else {
        failureTimer.current = setTimeout(() => {
          setSelectedWordPairs([]);
        }, CARD_CLOSING_DELAY);
      }
    }
  };

  return (
    <CardsGameField
      cardDimension={+trainingSettings.cardDimension}
      numberOfCards={wordPairs.length}
    >
      {wordPairs.map(({ id, pairId, word, onSpeech }) => {
        const selected = Boolean(
          selectedWordPairs.find(wordInfo => wordInfo.id === id)
        );

        return (
          <TrainingCard
            key={id}
            data-testid={`card-${pairId}-${word}`}
            open={completedPairIdsMap[pairId] || selected}
            color={rightSelectedPairId === pairId ? 'success' : null}
            dimension={+trainingSettings.cardDimension}
            textSize={+trainingSettings.cardTextSize}
            margin={4}
            onClick={handleClick(pairId, id, onSpeech)}
            depthShadow={selected ? 64 : 4}
          >
            <TrainingCardValue
              word={word}
              onSpeech={onSpeech}
              audible={audible}
            />
          </TrainingCard>
        );
      })}
    </CardsGameField>
  );
}

ClosedCardsGame.propTypes = {
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

export default ClosedCardsGame;
