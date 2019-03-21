import React from 'react';
import PropTypes from 'prop-types';

import './GameWordCard.css';

function GameWordCard({ wordId, pairId, word, selected, successful, successfulSelected, handleClick }) {
    return (
        <div className="word-card-square"
            onClick={handleClick(pairId, wordId)}>
            <div className="word-card-content">
                <div className="word-card-table">
                    <div className={`word-card-table-cell bg-primary text-white ${successfulSelected ? " border border-secondary" : ""}`}>
                        {selected || successful ?
                            <h5 className={successfulSelected ? " text-secondary" : ""}>
                                {word.lengt <= 10 ? word : word.match(/.{1,10}/g).join('\n')}
                            </h5> :
                            null}
                    </div>
                </div>
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
