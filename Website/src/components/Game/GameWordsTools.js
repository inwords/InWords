import React from 'react';
import PropTypes from 'prop-types';

function GameWordsTools({ handleResetGameLevel }) {
    return (
        <div className="p-2 mb-3">
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-outline-primary"
                    onClick={handleResetGameLevel}>Назад к уровням</button>
            </div>
        </div>
    );
}

GameWordsTools.propTypes = {
    handleResetGameLevel: PropTypes.func.isRequired
};

export default GameWordsTools;
