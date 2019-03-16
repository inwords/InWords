import React from 'react';
import PropTypes from 'prop-types';
import GameLevel from '../containers/GameLevel';

function GameLevelsField({ gameInfo }) {
    return (
        <div className="row">
            {gameInfo.levelInfos.map((levelInfo) =>
                <GameLevel
                    key={levelInfo.levelId}
                    levelInfo={levelInfo}
                />)}
        </div>
    );
}

GameLevelsField.propTypes = {
    gameInfo: PropTypes.object.isRequired
};

export default GameLevelsField;
