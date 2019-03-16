import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameWord from './GameWord';

class GameWordsField extends Component {
    static propTypes = {
        gameLevel: PropTypes.object.isRequired
    };

    state = {
        randomWords: [],
        selectedWords: [],
        successfulPairIds: [],
        successfulSelectedPairId: -1
    };

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

        if (successfulPairIds.find((successfulPairId) => successfulPairId === id)) {
            this.setState({
                successfulSelectedPairId: id
            });

            return;
        }

        if (selectedWords.length === 2 ||
            selectedWords.find((selectedWord) => selectedWord.id === id && selectedWord.word === word)) {
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
            if (selectedWords.find((visibleWord) => visibleWord.id === id) &&
                !successfulPairIds.find((successfulPairId) => successfulPairId === id)) {
                this.setState({
                    successfulPairIds: [...successfulPairIds, id],
                    selectedWords: [],
                    successfulSelectedPairId: id
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
        const { randomWords, selectedWords, successfulPairIds, successfulSelectedPairId } = this.state;

        return (
            <div className="row">
                {randomWords.map((randomWord, index) =>
                    <GameWord
                        key={index}
                        id={randomWord.id}
                        word={randomWord.word}
                        selected={!!selectedWords.find((selectedWord) =>
                            selectedWord.id === randomWord.id && selectedWord.word === randomWord.word)}
                        successful={!!~successfulPairIds.indexOf(randomWord.id)}
                        successfulSelected={successfulSelectedPairId === randomWord.id}
                        handleClick={this.handleClick}
                    />)}
            </div>

        );
    }
}

export default GameWordsField;
