import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import FadeAnimation from 'src/components/core/FadeAnimation';
import Fade from 'src/components/core/Fade';
import TrainingCard from 'src/components/routes-common/TrainingCard';

import './GameField.scss';

function GameField({
  trainingSettings,
  wordPairs,
  selectedWordPairs,
  rightSelectedPairId,
  completedPairIdsMap,
  selectedCompletedPairId,
  handleClick
}) {
  const maxWidth = useMemo(() => {
    let colsNum = Math.ceil(Math.sqrt(wordPairs.length));

    if (colsNum <= 2) {
      colsNum = 2;
    } else if (colsNum === 3) {
      colsNum = 3;
    }

    return +trainingSettings.cardDimension * colsNum + 8 * colsNum;
  }, [wordPairs.length, trainingSettings.cardDimension]);

  return (
    <div className="game-field" style={{ maxWidth }}>
      {wordPairs.map(({ id, pairId, word, onSpeech }) => (
        <FadeAnimation key={id}>
          <Fade in>
            <div>
              <TrainingCard
                data-testid={`card-${pairId}-${word}`}
                open={
                  completedPairIdsMap[pairId] ||
                  Boolean(
                    selectedWordPairs.find(
                      selectedWordInfo => selectedWordInfo.id === id
                    )
                  )
                }
                color={rightSelectedPairId === pairId ? 'success' : null}
                dimension={+trainingSettings.cardDimension}
                textSize={+trainingSettings.cardTextSize}
                onClick={handleClick(pairId, id, onSpeech)}
                depthShadow={selectedCompletedPairId === pairId ? 16 : 4}
              >
                {word}
              </TrainingCard>
            </div>
          </Fade>
        </FadeAnimation>
      ))}
    </div>
  );
}

GameField.propTypes = {
  trainingSettings: PropTypes.shape({
    cardDimension: PropTypes.string.isRequired,
    cardTextSize: PropTypes.string.isRequired
  }).isRequired,
  wordPairs: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      pairId: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      onSpeech: PropTypes.func
    }).isRequired
  ).isRequired,
  selectedWordPairs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  rightSelectedPairId: PropTypes.number.isRequired,
  completedPairIdsMap: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  selectedCompletedPairId: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default GameField;
