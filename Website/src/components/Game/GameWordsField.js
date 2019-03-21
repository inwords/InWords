import React from 'react';
import PropTypes from 'prop-types';
import GameWordCard from './GameWordCard';

function GameWordsField({ randomWords, selectedWordsInfo, successfulPairIds, successfulSelectedPairId, handleClick }) {
    return (
        randomWords.map((randomWord, index) =>
            <GameWordCard
                key={index}
                wordId={index}
                {...randomWord}
                selected={!!selectedWordsInfo.find((selectedWordInfo) => selectedWordInfo.wordId === index)}
                successful={!!~successfulPairIds.indexOf(randomWord.pairId)}
                successfulSelected={successfulSelectedPairId === randomWord.pairId}
                handleClick={handleClick}
            />)
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
