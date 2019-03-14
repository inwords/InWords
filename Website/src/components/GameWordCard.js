import React from 'react';
import PropTypes from 'prop-types';

const GameWordCard = ({ id, word, selected, successfulPair, handleClick }) => (
    <div className="col-6 col-sm-4 col-md-3 col-lg">
        <div className={successfulPair ?
            "card text-center text-white bg-primary border-secondary mb-3" :
            "card text-center text-white bg-primary mb-3"} onClick={() => handleClick(id, word)}>
            <div className="card-body">
                {selected || successfulPair ?
                    <h5 className={successfulPair ?
                        "card-title text-secondary" :
                        "card-title"}>{word}</h5> :
                    <h5 className="card-title invisible">...</h5>}
            </div>
        </div>
    </div>
);

GameWordCard.propTypes = {
    id: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    successfulPair: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default GameWordCard;
