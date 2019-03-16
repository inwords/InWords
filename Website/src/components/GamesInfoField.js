import React from 'react';
import PropTypes from 'prop-types';
import GameInfo from '../containers/GameInfo';

function GamesInfoField({ gamesInfo }) {
    return (
        <div className="row">
            {gamesInfo.map((gameInfo) =>
                <div className="col-sm-4" key={gameInfo.gameId}>
                    <GameInfo gameInfo={gameInfo} />
                </div>)}
        </div>
    );
}

GamesInfoField.propTypes = {
    gamesInfo: PropTypes.array.isRequired
};

export default GamesInfoField;
