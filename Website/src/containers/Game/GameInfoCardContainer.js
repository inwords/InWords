import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../../actions/GameActions';
import GameInfoCard from '../../components/Game/GameInfoCard';

class GameInfoCardContainer extends Component {
    static propTypes = {
        gameInfo: PropTypes.object.isRequired,
        pullGameInfo: PropTypes.func.isRequired
    };

    handlePullGameInfo = () => {
        this.props.pullGameInfo(this.props.gameInfo.gameId);
    };

    handleDelGamePack = () => {
        this.props.delGamePack(this.props.gameInfo.gameId);
    };

    render() {
        const { gameInfo } = this.props;

        return (
            <GameInfoCard
                title={gameInfo.title}
                isAvailable={gameInfo.isAvailable}
                handlePullGameInfo={this.handlePullGameInfo}
                handleDelGamePack={this.handleDelGamePack}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pullGameInfo: (gameId) => dispatch(GameActions.pullGameInfo(gameId)),
        delGamePack: (gameId) => dispatch(GameActions.delGamePack(gameId))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(GameInfoCardContainer);
