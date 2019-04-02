import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import GameInfoCard from '../../components/Game/GameInfoCard';

class GameInfoCardContainer extends Component {
    static propTypes = {
        gameInfo: PropTypes.object.isRequired,
        pullGameInfo: PropTypes.func.isRequired
    };

    handlePullGameInfo = () => {
        this.props.pullGameInfo(this.props.gameInfo.gameId);
    };

    handleDeleteGamePack = () => {
        this.props.deleteGamePack(this.props.gameInfo.gameId);
    };

    render() {
        const { gameInfo } = this.props;

        return (
            <GameInfoCard
                title={gameInfo.title}
                isAvailable={gameInfo.isAvailable}
                handlePullGameInfo={this.handlePullGameInfo}
                handleDeleteGamePack={this.handleDeleteGamePack}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pullGameInfo: (gameId) => dispatch(gameApiActions.pullGameInfo(gameId)),
        deleteGamePack: (gameId) => dispatch(gameApiActions.deleteGamePack(gameId))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(GameInfoCardContainer);
