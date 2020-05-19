import React from 'react';
import PropTypes from 'prop-types';
import useCardsGame from 'src/components/routes-common/useCardsGame';
import CardsGameField from 'src/components/routes-common/CardsGameField';
import AnimatedTrainingCard from 'src/components/routes-common/AnimatedTrainingCard';
import Icon from 'src/components/core/Icon';

const CARD_CLOSING_DELAY = 700;
const GAME_COMPLETION_DELAY = 1000;

function ClosedCardsGame({
  trainingLevel,
  trainingSettings,
  handleEnd,
  variantions: { isAudio, isSameLang }
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
  } = useCardsGame(trainingLevel.wordTranslations, { isSameLang });

  const handleClick = (pairId, id, onSpeech) => () => {
    if (trainingSettings.voiceOn && onSpeech) {
      onSpeech();
    }

    if (completedPairIdsMap[pairId]) {
      return;
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

      setSelectedWordPairs(
        selectedWordPairs.concat({
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

    if (selectedWordPairs.length === 1) {
      if (selectedWordPairs[0].pairId === pairId) {
        setSelectedWordPairs([]);

        const newCompletedPairIdsMap = {
          ...completedPairIdsMap,
          [pairId]: true
        };

        setCompletedPairIdsMap(newCompletedPairIdsMap);
        setRightSelectedPairId(pairId);

        if (isGameCompleted(newCompletedPairIdsMap)) {
          setTimeout(() => {
            handleEnd('cards', newMetrics);
          }, GAME_COMPLETION_DELAY);
        }
      } else {
        setTimeout(() => {
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
          <AnimatedTrainingCard
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
            {isAudio && onSpeech ? (
              <Icon fontSize="large">volume_up</Icon>
            ) : (
              word
            )}
          </AnimatedTrainingCard>
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
  variantions: PropTypes.shape({
    isAudio: PropTypes.bool.isRequired,
    isSameLang: PropTypes.bool.isRequired
  }).isRequired
};

export default ClosedCardsGame;
