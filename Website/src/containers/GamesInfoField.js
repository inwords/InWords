import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../actions/GameActions';
import GameInfoCard from './GameInfoCard';

class GamesInfoField extends Component {
    static propTypes = {
        gamesInfo: PropTypes.array.isRequired,
        pullGamesInfo: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.pullGamesInfo();
    }

    render() {
        const { gamesInfo } = this.props;

        return (
            <div className="row">
                {gamesInfo.map((gameInfo) =>
                    <GameInfoCard
                        key={gameInfo.gameId}
                        gameInfo={gameInfo}
                    />)}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        gamesInfo: store.game.gamesInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pullGamesInfo: () => dispatch(GameActions.pullGamesInfo())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamesInfoField);
