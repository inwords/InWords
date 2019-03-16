import React from 'react';
import PropTypes from 'prop-types';
import GameInfo from '../containers/GameInfo';

function GamesInfoField({ gamesInfo }) {
    return (
        <div className="row">
            {gamesInfo.map((gameInfo) =>
                <GameInfo
                    key={gameInfo.gameId}
                    gameInfo={gameInfo}
                />)}
        </div>
    );
}

GamesInfoField.propTypes = {
    gamesInfo: PropTypes.array.isRequired
};

export default GamesInfoField;
