import React from 'react';
import PropTypes from 'prop-types';
import FadeAnimation from 'src/components/core/FadeAnimation';
import Fade from 'src/components/core/Fade';
import GameCard from './GameCard';

import './GameField.scss';

function GameField({
  cardSettings,
  wordPairs,
  selectedWordPairs,
  completedPairIdsMap,
  selectedCompletedPairId,
  gameCompleted,
  handleClick
}) {
  const maxWidth = React.useMemo(() => {
    let colsNum = Math.ceil(Math.sqrt(wordPairs.length));

    if (colsNum <= 2) {
      colsNum = 2;
    } else if (colsNum === 3) {
      colsNum = 3;
    }

    return cardSettings.cardDimension * colsNum + 8 * colsNum;
  }, [wordPairs.length, cardSettings.cardDimension]);

  return (
    <div className="game-field" style={{ maxWidth }}>
      {wordPairs.map(({ id, pairId, word, onSpeech }) => (
        <FadeAnimation key={id}>
          <Fade in={!gameCompleted}>
            <div>
              <GameCard
                open={
                  completedPairIdsMap[pairId] ||
                  Boolean(
                    selectedWordPairs.find(
                      selectedWordInfo => selectedWordInfo.id === id
                    )
                  )
                }
                dimension={cardSettings.cardDimension}
                textSize={cardSettings.cardTextSize}
                onClick={handleClick(pairId, id, onSpeech)}
                depthShadow={selectedCompletedPairId === pairId ? 16 : 4}
              >
                {word}
              </GameCard>
            </div>
          </Fade>
        </FadeAnimation>
      ))}
    </div>
  );
}

GameField.propTypes = {
  cardSettings: PropTypes.exact({
    cardDimension: PropTypes.number.isRequired,
    cardTextSize: PropTypes.number.isRequired
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
  completedPairIdsMap: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  selectedCompletedPairId: PropTypes.number.isRequired,
  gameCompleted: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default GameField;
