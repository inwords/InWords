import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameLevelCard from './GameLevelCard';

class GameLevelsField extends Component {
    static propTypes = {
        gameInfo: PropTypes.object.isRequired,
        pullGameInfo: PropTypes.func.isRequired
    };

    render() {
        const { gameInfo } = this.props;

        return (
            <div className="row">
                {gameInfo.levelInfos.map((levelInfo) =>
                    <GameLevelCard
                        key={levelInfo.levelId}
                        levelInfo={levelInfo}
                    />)}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        gameInfo: store.game.gameInfo
    };
};

export default connect(
    mapStateToProps
)(GameLevelsField);
