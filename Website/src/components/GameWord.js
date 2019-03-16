import React from 'react';
import PropTypes from 'prop-types';

function GameWord({ id, word, selected, successful, successfulSelected, handleClick }) {
    return (
        <div className="col-6 col-sm-4 col-md-4 col-lg-3 d-flex py-2">
            <div className={successfulSelected ?
                "card flex-fill text-center text-white bg-primary border-secondary" :
                "card flex-fill text-center text-white bg-primary"} onClick={() => handleClick(id, word)}>
                <div className="card-body">
                    {selected || successful ?
                        <h5 className={successfulSelected ?
                            "card-title text-secondary" :
                            "card-title"}>{word}</h5> :
                        <h5 className="card-title invisible">...</h5>}
                </div>
            </div>
        </div>
    );
}

GameWord.propTypes = {
    id: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    successful: PropTypes.bool.isRequired,
    successfulSelected: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default GameWord;
