import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameWordCard from './GameWordCard';

class GameField extends Component {
    state = {
        randomWords: [],
        selectedWords: [],
        successfulPairIds: []
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.successfulPairIds !== prevState.successfulPairIds
            && this.state.successfulPairIds.length === this.props.gameLevel.wordTranslations.length) {
            setTimeout(() => {
                this.props.completeGame();
            }, 1000);
        }
    }

    componentDidMount() {
        this.setState({
            randomWords: [].concat.apply([], this.props.gameLevel.wordTranslations.map((wordPair) =>
                [{
                    id: wordPair.serverId,
                    word: wordPair.wordForeign
                }, {
                    id: wordPair.serverId,
                    word: wordPair.wordNative
                }])).sort(() => Math.random() - 0.5)
        });
    }

    handleClick = (id, word) => {
        const { selectedWords, successfulPairIds } = this.state;

        if (selectedWords.length === 2 || selectedWords.find((visibleWord) =>
            visibleWord.id === id && visibleWord.word === word)) {
            return;
        }

        if (selectedWords.length < 2) {
            this.setState({
                selectedWords: selectedWords.concat({
                    id: id,
                    word: word
                })
            });
        }

        if (selectedWords.length > 0) {
            if (selectedWords.find((visibleWord) =>
                visibleWord.id === id)) {
                this.setState({
                    successfulPairIds: [...successfulPairIds, id],
                    selectedWords: []
                });
            } else {
                setTimeout(() => {
                    this.setState({
                        selectedWords: []
                    })
                }, 1000);
            }
        }
    };

    render() {
        const { randomWords, selectedWords, successfulPairIds } = this.state;

        return (
            <div className="row">
                {randomWords.map((randomWord, index) =>
                    <GameWordCard
                        key={index}
                        id={randomWord.id}
                        word={randomWord.word}
                        visible={!!selectedWords.find((visibleWord) =>
                            visibleWord.id === randomWord.id && visibleWord.word === randomWord.word)}
                        successfulPair={successfulPairIds.find((successfulPairId) =>
                            successfulPairId === randomWord.id)}
                        handleClick={this.handleClick}
                    />)}
            </div>
        );
    }
}

GameField.propTypes = {
    gameLevel: PropTypes.object.isRequired,
    completeGame: PropTypes.func.isRequired
};

export default GameField;
