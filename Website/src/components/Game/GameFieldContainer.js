import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import GameField from './GameField';

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
    const [infoAboutRandomWords, setInfoAboutRandomWords] = useState([]);
    const [infoAboutSelectedWords, setInfoAboutSelectedWords] = useState([]);
    const [successfulPairIds, setSuccessfulPairIds] = useState([]);
    const [successfulSelectedPairId, setSuccessfulSelectedPairId] = useState(-1);
    const [closuresQuantity, setClosuresQuantity] = useState(0);

    useEffect(() => {
        if (gameLevel.levelId !== parseInt(match.params.id)) {
            pullGameLevel(parseInt(match.params.id));
        } else {
            const shuffledWordTranslations = shuffle([...gameLevel.wordTranslations]);
            const infoAboutWords = [].concat.apply([], shuffledWordTranslations.slice(0, 8).map(wordPair =>
                [{
                    pairId: wordPair.serverId,
                    word: wordPair.wordForeign
                }, {
                    pairId: wordPair.serverId,
                    word: wordPair.wordNative
                }]
            ));

            setInfoAboutRandomWords(shuffle(infoAboutWords));
        }
    }, [gameLevel]);

    useEffect(() => {
        if (successfulPairIds.length > 0 && successfulPairIds.length === infoAboutRandomWords.length / 2) {
            saveLevelResult({
                levelId: gameLevel.levelId,
                openingQuantity: closuresQuantity * 2 + infoAboutRandomWords.length
            });
        }
    }, [successfulPairIds]);

    const handleClick = (pairId, wordId) => () => {
        if (successfulPairIds.find(successfulPairId => successfulPairId === pairId)) {
            setSuccessfulSelectedPairId(pairId);
            return;
        }

        if (infoAboutSelectedWords.length === 2 ||
            infoAboutSelectedWords.find(selectedWordInfo => selectedWordInfo.wordId === wordId)) {
            return;
        }

        if (infoAboutSelectedWords.length < 2) {
            setInfoAboutSelectedWords(infoAboutSelectedWords.concat({
                pairId: pairId,
                wordId: wordId
            }));
        }

        if (infoAboutSelectedWords.length > 0) {
            if (infoAboutSelectedWords.find(selectedWordInfo => selectedWordInfo.pairId === pairId) &&
                !successfulPairIds.find(successfulPairId => successfulPairId === pairId)) {
                setSuccessfulPairIds([...successfulPairIds, pairId]);
                setInfoAboutSelectedWords([]);
                setSuccessfulSelectedPairId(pairId);
            } else {
                setTimeout(() => {
                    setInfoAboutSelectedWords([]);
                    setClosuresQuantity(closuresQuantity + 1);
                }, 1000);
            }
        }
    };

    return (
        <GameField
            columnsNum={Math.ceil(Math.sqrt(infoAboutRandomWords.length))}
            infoAboutRandomWords={infoAboutRandomWords}
            infoAboutSelectedWords={infoAboutSelectedWords}
            successfulPairIds={successfulPairIds}
            successfulSelectedPairId={successfulSelectedPairId}
            handleClick={handleClick}
        />
    );
}

GameFieldContainer.propTypes = {
    gameLevel: PropTypes.shape({
        levelId: PropTypes.number,
        wordTranslations: PropTypes.arrayOf(PropTypes.shape({
            serverId: PropTypes.number.isRequired,
            wordForeign: PropTypes.string.isRequired,
            wordNative: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
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
        saveLevelResult: levelResult => dispatch(gameApiActions.saveLevelResult(levelResult))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(GameFieldContainer));
