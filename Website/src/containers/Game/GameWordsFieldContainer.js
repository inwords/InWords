import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameWordsField from '../../components/Game/GameWordsField';

class GameWordsFieldContainer extends Component {
    static propTypes = {
        gameLevel: PropTypes.object.isRequired
    };

    state = {
        randomWords: shuffle([].concat.apply([], this.props.gameLevel.wordTranslations.map((wordPair) =>
            [{
                pairId: wordPair.serverId,
                word: wordPair.wordForeign
            }, {
                pairId: wordPair.serverId,
                word: wordPair.wordNative
            }]
        ))),
        selectedWordsInfo: [],
        successfulPairIds: [],
        successfulSelectedPairId: -1
    };

    handleClick = (pairId, wordId) => () => {
        const { selectedWordsInfo, successfulPairIds } = this.state;

        if (successfulPairIds.find((successfulPairId) => successfulPairId === pairId)) {
            this.setState({
                successfulSelectedPairId: pairId
            });

            return;
        }

        if (selectedWordsInfo.length === 2 ||
            selectedWordsInfo.find((selectedWordInfo) => selectedWordInfo.wordId === wordId)) {
            return;
        }

        if (selectedWordsInfo.length < 2) {
            this.setState({
                selectedWordsInfo: selectedWordsInfo.concat({
                    pairId: pairId,
                    wordId: wordId
                })
            });
        }

        if (selectedWordsInfo.length > 0) {
            if (selectedWordsInfo.find((selectedWordInfo) => selectedWordInfo.pairId === pairId) &&
                !successfulPairIds.find((successfulPairId) => successfulPairId === pairId)) {
                this.setState({
                    successfulPairIds: [...successfulPairIds, pairId],
                    selectedWordsInfo: [],
                    successfulSelectedPairId: pairId
                });
            } else {
                setTimeout(() => {
                    this.setState({
                        selectedWordsInfo: []
                    })
                }, 1000);
            }
        }
    };

    render() {
        const { randomWords, selectedWordsInfo, successfulPairIds, successfulSelectedPairId } = this.state;

        return (
            <GameWordsField
                randomWords={randomWords}
                selectedWordsInfo={selectedWordsInfo}
                successfulPairIds={successfulPairIds}
                successfulSelectedPairId={successfulSelectedPairId}
                handleClick={this.handleClick}
            />
        );
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

export default GameWordsFieldContainer;
