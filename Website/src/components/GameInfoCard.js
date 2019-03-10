import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameInfoCard extends Component {
    handleClickPullGameInfo = () => {
        this.props.pullGameInfo(this.props.gameInfo.gameID);
    };

    render() {
        const { gameInfo } = this.props;

        return (
            <div className="col-sm-4">
                <div className="card text-center text-white bg-primary mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{gameInfo.title}</h5>
                        <button type="button" className="btn btn-outline-secondary" disabled={!gameInfo.isAvailable} onClick={this.handleClickPullGameInfo}>Выбрать</button>
                    </div>
                </div>
            </div>
        );
    }
}

GameInfoCard.propTypes = {
    gameInfo: PropTypes.object.isRequired,
    pullGameInfo: PropTypes.func.isRequired
};

export default GameInfoCard;
