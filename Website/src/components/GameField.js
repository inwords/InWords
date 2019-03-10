import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameWordCard from './GameWordCard';

class GameField extends Component {
    state = {
        randomWords: []
    };

    componentDidMount() {
        this.setState({
            randomWords: this.props.gameLevel.wordTranslations.flatMap((wordPair) =>
                [{
                    id: wordPair.serverId,
                    word: wordPair.wordForeign
                }, {
                    id: wordPair.serverId,
                    word: wordPair.wordNative
                }]).sort(() => Math.random() - 0.5)
        });
    }

    handleClick = (id) => {
    };

    render() {
        const { randomWords } = this.state;

        return (
            <div className="row">
                {randomWords.map((randomWord, index) =>
                    <GameWordCard
                        key={index}
                        randomWord={randomWord}
                        opened={true}
                        visible={true}
                        handleClick={this.handleClick}
                    />)
                }
            </div>
        );
    }
}

GameField.propTypes = {
    gameLevel: PropTypes.object.isRequired
};

export default GameField;
