import React from 'react';
import PropTypes from 'prop-types';
import useCardsGame from 'src/components/routes-common/useCardsGame';
import CardsGameField from 'src/components/routes-common/CardsGameField';
import AnimatedTrainingCard from 'src/components/routes-common/AnimatedTrainingCard';
import TrainingCardValue from 'src/components/routes-common/TrainingCardValue';

const CARDS_CLOSING_DELAY = 700;
const CARDS_RESET_DELAY = 500;
const GAME_COMPLETION_DELAY = 500;

function OpenedCardsGame({
  trainingLevel,
  trainingSettings,
  handleEnd,
  variations: { audible, sameLang },
  internalName = 'openCards'
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

  const handleClick = (pairId, id, onSpeech) => () => {
    if (completedPairIdsMap[pairId]) {
      setSelectedWordPairs([]);
      return;
    }

    if ((trainingSettings.voiceOn || audible) && onSpeech) {
      onSpeech();
    }

    if (
      selectedWordPairs.length === 2 ||
      (selectedWordPairs.length && selectedWordPairs[0].id === id)
    ) {
      return;
    }

    let newMetrics = metrics;
    if (selectedWordPairs.length < 2) {
      setRightSelectedPairId(-1);

      setSelectedWordPairs(selectedWordPairs.concat({ id, pairId }));

      newMetrics = {
        ...metrics,
        [pairId]: metrics[pairId] ? metrics[pairId] + 1 : 1
      };
      setMetrics(newMetrics);
    }

    if (selectedWordPairs.length === 1) {
      if (selectedWordPairs[0].pairId === pairId) {
        setRightSelectedPairId(pairId);

        setTimeout(() => {
          setSelectedWordPairs([]);

          const newCompletedPairIdsMap = {
            ...completedPairIdsMap,
            [pairId]: true
          };
          setCompletedPairIdsMap(newCompletedPairIdsMap);

          if (isGameCompleted(newCompletedPairIdsMap)) {
            setTimeout(() => {
              handleEnd(internalName, newMetrics);
            }, GAME_COMPLETION_DELAY);
          }
        }, CARDS_CLOSING_DELAY);
      } else {
        setTimeout(() => {
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
        <AnimatedTrainingCard
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
        </AnimatedTrainingCard>
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
  internalName: PropTypes.string
};

export default OpenedCardsGame;
