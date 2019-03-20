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
                pairId: wordPair.serverId,
                word: wordPair.wordForeign
            }, {
                pairId: wordPair.serverId,
                word: wordPair.wordNative
            }]
        )).sort(() => Math.random() - 0.5),
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

export default GameWordsFieldContainer;
