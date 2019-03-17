import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameContainer from './GameContainer';
import GamePackAdding from './GamePackAdding';

class GamePage extends Component {
    static propTypes = {
        gameInfo: PropTypes.object
    };

    state = {
        addModeActivated: false,
    };

    handleSwitchAddMode = () => {
        this.setState({
            addModeActivated: !this.state.addModeActivated
        });
    };

    render() {
        const { gameInfo } = this.props;
        const { addModeActivated } = this.state;

        return (
            <Fragment>
                {!addModeActivated && !gameInfo ?
                    <div className="p-2 mb-3">
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-outline-primary"
                                onClick={this.handleSwitchAddMode}>Создать игру</button>
                        </div>
                    </div> :
                    <Fragment />}
                {!addModeActivated ?
                    <GameContainer /> :
                    <GamePackAdding handleCancel={this.handleSwitchAddMode} />}
            </Fragment>
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
)(GamePage);
