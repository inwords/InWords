import React from 'react';
import PropTypes from 'prop-types';

function GameWordCard({ wordId, pairId, word, selected, successful, successfulSelected, handleClick }) {
    return (
        <div className={`card flex-fill text-center text-white bg-primary${successfulSelected ? " border-secondary" : ""}`}
            onClick={handleClick(pairId, wordId)}>
            <div className="card-body">
                {selected || successful ?
                    <h5 className={`card-title${successfulSelected ? " text-secondary" : ""}`}>{word}</h5> :
                    <h5 className="card-title invisible">...</h5>}
            </div>
        </div>
    );
}

GameWordCard.propTypes = {
    wordId: PropTypes.number.isRequired,
    pairId: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    successful: PropTypes.bool.isRequired,
    successfulSelected: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default GameWordCard;
