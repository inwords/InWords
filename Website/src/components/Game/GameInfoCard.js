import React from 'react';
import PropTypes from 'prop-types';

function GameInfoCard({ title, isAvailable, handlePullGameInfo, handleDelGamePack }) {
    return (
        <div className="card flex-fill text-center text-white bg-primary mb-3">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary"
                        disabled={!isAvailable} onClick={handlePullGameInfo}>Выбрать</button>
                    <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only">Дополнительно</span>
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#/game" onClick={handleDelGamePack}>Удалить</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

GameInfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    handlePullGameInfo: PropTypes.func.isRequired,
    handleDelGamePack: PropTypes.func.isRequired
};

export default GameInfoCard;
