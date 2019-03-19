import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../../actions/GameActions';
import GameLevel from '../../components/Game/GameLevel';

class GameLevelContainer extends Component {
    static propTypes = {
        levelInfo: PropTypes.object.isRequired,
        pullGameLevel: PropTypes.func.isRequired
    };

    handlePullGameLevel = () => {
        this.props.pullGameLevel(this.props.levelInfo.levelId);
    };

    render() {
        const { levelInfo } = this.props;

        return (
            <GameLevel
                levelInfo={levelInfo}
                handlePullGameLevel={this.handlePullGameLevel}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pullGameLevel: (levelId) => dispatch(GameActions.pullGameLevel(levelId))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(GameLevelContainer);
