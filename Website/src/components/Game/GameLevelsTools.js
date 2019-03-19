import React from 'react';
import PropTypes from 'prop-types';

function GameLevelsTools({ handleResetGameInfo }) {
    return (
        <div className="p-2 mb-3">
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-outline-primary"
                    onClick={handleResetGameInfo}>Назад к играм</button>
            </div>
        </div>
    );
}

GameLevelsTools.propTypes = {
    handleResetGameInfo: PropTypes.func.isRequired
};

export default GameLevelsTools;
