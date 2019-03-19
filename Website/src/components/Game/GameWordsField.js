import React from 'react';
import PropTypes from 'prop-types';
import GameWord from '../../components/Game/GameWord';

function GameWordsField({ randomWords, selectedWords, successfulPairIds, successfulSelectedPairId, handleClick }) {
    const cardsInRow = Math.ceil(Math.sqrt(randomWords.length));
    
    return (
        <div className="row">
            {randomWords.map((randomWord, index) =>
                <div className={"col-6" +
                    " col-sm-" + (cardsInRow < 3 ? 12 / cardsInRow : 4) +
                    " col-md-" + (cardsInRow < 3 ? 12 / cardsInRow : 4) +
                    " col-lg-" + (cardsInRow < 4 ? 12 / cardsInRow : 3) +
                    " d-flex py-2"} key={index}>
                    <GameWord
                        id={randomWord.id}
                        word={randomWord.word}
                        selected={!!selectedWords.find((selectedWord) =>
                            selectedWord.id === randomWord.id && selectedWord.word === randomWord.word)}
                        successful={!!~successfulPairIds.indexOf(randomWord.id)}
                        successfulSelected={successfulSelectedPairId === randomWord.id}
                        handleClick={handleClick}
                    />
                </div>)}
        </div>
    );
}

GameWordsField.propTypes = {
    randomWords: PropTypes.array.isRequired,
    selectedWords: PropTypes.array.isRequired,
    successfulPairIds: PropTypes.array.isRequired,
    successfulSelectedPairId: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default GameWordsField;
