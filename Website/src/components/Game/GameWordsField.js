import React from 'react';
import PropTypes from 'prop-types';
import GameWordCard from '../../components/Game/GameWordCard';

function GameWordsField({ randomWords, selectedWordsInfo, successfulPairIds, successfulSelectedPairId, handleClick }) {
    const cardsInRow = Math.ceil(Math.sqrt(randomWords.length));

    return (
        <div className="row">
            {randomWords.map((randomWord, index) =>
                <div className={`col-6 col-sm-${cardsInRow < 3 ? 12 / cardsInRow : 4} col-md-${cardsInRow < 3 ? 12 / cardsInRow : 4} col-lg-${cardsInRow < 4 ? 12 / cardsInRow : 3} d-flex py-2`}
                    key={index}>
                    <GameWordCard
                        wordId={index}
                        {...randomWord}
                        selected={!!selectedWordsInfo.find((selectedWordInfo) => selectedWordInfo.wordId === index)}
                        successful={!!~successfulPairIds.indexOf(randomWord.pairId)}
                        successfulSelected={successfulSelectedPairId === randomWord.pairId}
                        handleClick={handleClick}
                    />
                </div>)}
        </div>
    );
}

GameWordsField.propTypes = {
    randomWords: PropTypes.array.isRequired,
    selectedWordsInfo: PropTypes.array.isRequired,
    successfulPairIds: PropTypes.array.isRequired,
    successfulSelectedPairId: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default GameWordsField;
