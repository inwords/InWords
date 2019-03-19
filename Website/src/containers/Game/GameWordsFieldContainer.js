import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameWordsField from '../../components/Game/GameWordsField';

class GameWordsFieldContainer extends Component {
    static propTypes = {
        gameLevel: PropTypes.object.isRequired
    };

    state = {
        randomWords: [].concat.apply([], this.props.gameLevel.wordTranslations.map((wordPair) =>
            [{
                id: wordPair.serverId,
                word: wordPair.wordForeign
            }, {
                id: wordPair.serverId,
                word: wordPair.wordNative
            }]
        )).sort(() => Math.random() - 0.5),
        selectedWords: [],
        successfulPairIds: [],
        successfulSelectedPairId: -1
    };

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
            <GameWordsField
                randomWords={randomWords}
                selectedWords={selectedWords}
                successfulPairIds={successfulPairIds}
                successfulSelectedPairId={successfulSelectedPairId}
                handleClick={this.handleClick}
            />
        );
    }
}

export default GameWordsFieldContainer;
