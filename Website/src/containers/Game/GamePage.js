import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../../actions/GameActions';
import GamesInfoTools from '../../components/Game/GamesInfoTools';
import GameLevelsTools from '../../components/Game/GameLevelsTools';
import GameWordsTools from '../../components/Game/GameWordsTools';
import GamesInfoField from '../../components/Game/GamesInfoField';
import GameLevelsField from '../../components/Game/GameLevelsField';
import GameWordsFieldContainer from './GameWordsFieldContainer';
import GamePackAdding from './GamePackAddingContainer';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../index.scss';

class GamePage extends Component {
    static propTypes = {
        gamesInfo: PropTypes.array.isRequired,
        gameInfo: PropTypes.object,
        gameLevel: PropTypes.object,
        pullGamesInfo: PropTypes.func.isRequired,
        resetGameInfo: PropTypes.func.isRequired,
        resetGameLevel: PropTypes.func.isRequired
    };

    state = {
        addModeActivated: false,
    };

    componentDidMount() {
        this.props.pullGamesInfo();
    }

    handleResetGameInfo = () => {
        this.props.resetGameInfo();
    };

    handleResetGameLevel = () => {
        this.props.resetGameLevel();
    };

    handleSwitchAddMode = () => {
        this.setState({
            addModeActivated: !this.state.addModeActivated
        });
    };

    render() {
        const { gamesInfo, gameInfo, gameLevel } = this.props;
        const { addModeActivated } = this.state;

        return (
            !addModeActivated ?
                (!gameInfo ?
                    <Fragment>
                        <GamesInfoTools handleSwitchAddMode={this.handleSwitchAddMode} />
                        <GamesInfoField gamesInfo={gamesInfo} />
                    </Fragment> :
                    (!gameLevel ?
                        <Fragment>
                            <GameLevelsTools handleResetGameInfo={this.handleResetGameInfo} />
                            <GameLevelsField gameInfo={gameInfo} />
                        </Fragment> :
                        <Fragment>
                            <GameWordsTools handleResetGameLevel={this.handleResetGameLevel} />
                            <GameWordsFieldContainer gameLevel={gameLevel} />
                        </Fragment>)) :
                <GamePackAdding handleCancel={this.handleSwitchAddMode} />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        gamesInfo: store.game.gamesInfo,
        gameInfo: store.game.gameInfo,
        gameLevel: store.game.gameLevel
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pullGamesInfo: () => dispatch(GameActions.pullGamesInfo()),
        resetGameInfo: () => dispatch(GameActions.resetGameInfo()),
        resetGameLevel: () => dispatch(GameActions.resetGameLevel())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePage);
