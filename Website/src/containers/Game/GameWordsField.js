import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameWord from '../../components/Game/GameWord';

class GameWordsField extends Component {
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
        maxCol: Math.ceil(Math.sqrt(this.props.gameLevel.wordTranslations.length * 2)),
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
        const { randomWords, maxCol, selectedWords, successfulPairIds, successfulSelectedPairId } = this.state;

        return (
            <div className="row">
                {randomWords.map((randomWord, index) =>
                    <div className={"col-6" +
                        " col-sm-" + (maxCol < 3 ? 12 / maxCol : 4) +
                        " col-md-" + (maxCol < 3 ? 12 / maxCol : 4) +
                        " col-lg-" + (maxCol < 4 ? 12 / maxCol : 3) +
                        " d-flex py-2"} key={index}>
                        <GameWord
                            id={randomWord.id}
                            word={randomWord.word}
                            selected={!!selectedWords.find((selectedWord) =>
                                selectedWord.id === randomWord.id && selectedWord.word === randomWord.word)}
                            successful={!!~successfulPairIds.indexOf(randomWord.id)}
                            successfulSelected={successfulSelectedPairId === randomWord.id}
                            handleClick={this.handleClick}
                        />
                    </div>)}
            </div>

        );
    }
}

export default GameWordsField;
