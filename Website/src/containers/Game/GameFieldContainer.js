import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import GameWordsField from '../../components/Game/GameWordsField';

const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
};

function GameFieldContainer({ gameLevel, pullGameLevel, saveLevelResult, match }) {
    const [values, setValues] = useState({
        randomWords: [],
        selectedWordsInfo: [],
        successfulPairIds: [],
        successfulSelectedPairId: -1,
        closuresQuantity: 0
    });

    useEffect(() => {
        if (!gameLevel) {
            pullGameLevel(parseInt(match.params.id));
        } else {
            const shuffledWordPairs = shuffle(gameLevel.wordTranslations.slice());
            const words = [].concat.apply([], shuffledWordPairs.slice(0, 8).map(wordPair =>
                [{
                    pairId: wordPair.serverId,
                    word: wordPair.wordForeign
                }, {
                    pairId: wordPair.serverId,
                    word: wordPair.wordNative
                }]
            ));

            setValues({ ...values, randomWords: shuffle(words) });
        }
    }, [gameLevel]);

    useEffect(() => {
        if (values.successfulPairIds.length > 0 &&
            values.successfulPairIds.length === values.randomWords.length / 2) {
            saveLevelResult({
                levelId: gameLevel.levelId,
                openingQuantity: values.closuresQuantity * 2 + values.randomWords.length
            });
        }
    }, [values.successfulPairIds]);

    const handleClick = (pairId, wordId) => () => {
        if (values.successfulPairIds.find(successfulPairId => successfulPairId === pairId)) {
            setValues({ ...values, successfulSelectedPairId: pairId });
            return;
        }

        if (values.selectedWordsInfo.length === 2 ||
            values.selectedWordsInfo.find(selectedWordInfo => selectedWordInfo.wordId === wordId)) {
            return;
        }

        if (values.selectedWordsInfo.length < 2) {
            setValues({
                ...values,
                selectedWordsInfo: values.selectedWordsInfo.concat({
                    pairId: pairId,
                    wordId: wordId
                })
            });
        }

        if (values.selectedWordsInfo.length > 0) {
            if (values.selectedWordsInfo.find(selectedWordInfo => selectedWordInfo.pairId === pairId) &&
                !values.successfulPairIds.find(successfulPairId => successfulPairId === pairId)) {
                setValues({
                    ...values,
                    successfulPairIds: [...values.successfulPairIds, pairId],
                    selectedWordsInfo: [],
                    successfulSelectedPairId: pairId
                });
            } else {
                setTimeout(() => {
                    setValues({
                        ...values,
                        selectedWordsInfo: [],
                        closuresQuantity: values.closuresQuantity + 1
                    });
                }, 1000);
            }
        }
    };

    return (
        <GameWordsField
            randomWords={values.randomWords}
            selectedWordsInfo={values.selectedWordsInfo}
            successfulPairIds={values.successfulPairIds}
            successfulSelectedPairId={values.successfulSelectedPairId}
            handleClick={handleClick}
        />
    );
}

GameFieldContainer.propTypes = {
    gameLevel: PropTypes.object,
    pullGameLevel: PropTypes.func.isRequired,
    saveLevelResult: PropTypes.func.isRequired,
};

const mapStateToProps = store => {
    return {
        gameLevel: store.game.gameLevel
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pullGameLevel: levelId => dispatch(gameApiActions.pullGameLevel(levelId)),
        saveLevelResult: levelResult => dispatch(gameApiActions.saveLevelResult(levelResult)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GameFieldContainer));
