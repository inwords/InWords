import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../actions/GameActions';
import GameWordCard from '../components/GameWordCard';

class GameField extends Component {
    static propTypes = {
        gameLevel: PropTypes.object.isRequired,
        completeGame: PropTypes.func.isRequired
    };

    state = {
        randomWords: [],
        selectedWords: [],
        successfulPairIds: []
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.successfulPairIds !== prevState.successfulPairIds) {
            if (this.state.successfulPairIds.length === this.props.gameLevel.wordTranslations.length) {
                setTimeout(() => {
                    this.props.completeGame();
                }, 1000);
            }
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
                }]
            )).sort(() => Math.random() - 0.5)
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
                        selected={!!selectedWords.find((selectedWord) =>
                            selectedWord.id === randomWord.id && selectedWord.word === randomWord.word)}
                        successfulPair={!!successfulPairIds.find((successfulPairId) =>
                            successfulPairId === randomWord.id)}
                        handleClick={this.handleClick}
                    />)}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        completeGame: () => dispatch(GameActions.completeGame())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(GameField);
