import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import FinalGameField from './FinalGameField';
import GameField from './GameField';
import withActualGameLevel from './withActualGameLevel';

const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
};

function GameFieldContainer({ gameLevel, saveLevelResult }) {
    const [infoAboutRandomWords, setInfoAboutRandomWords] = React.useState([]);
    const [infoAboutSelectedWords, setInfoAboutSelectedWords] = React.useState([]);
    const [successfulPairIds, setSuccessfulPairIds] = React.useState([]);
    const [successfulSelectedPairId, setSuccessfulSelectedPairId] = React.useState(-1);
    const [closuresQuantity, setClosuresQuantity] = React.useState(0);
    const [gameCompleted, setGameCompleted] = React.useState(false);

    React.useEffect(() => {
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
    }, []);

    React.useEffect(() => {
        if (successfulPairIds.length > 0 && successfulPairIds.length === infoAboutRandomWords.length / 2) {
            setTimeout(() => {
                saveLevelResult({
                    levelId: gameLevel.levelId,
                    openingQuantity: closuresQuantity * 2 + infoAboutRandomWords.length,
                    wordsCount: infoAboutRandomWords.length
                });
                setGameCompleted(true);
            }, 500);
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
                setInfoAboutSelectedWords([]);
                setSuccessfulPairIds([...successfulPairIds, pairId]);
                setSuccessfulSelectedPairId(pairId);
            } else {
                setTimeout(() => {
                    setInfoAboutSelectedWords([]);
                    setClosuresQuantity(closuresQuantity + 1);
                }, 1000);
            }
        }
    };

    const handleReplay = () => {
        setInfoAboutSelectedWords([]);
        setSuccessfulPairIds([]);
        setSuccessfulSelectedPairId(-1);
        setClosuresQuantity(0);
        setGameCompleted(false);

        setInfoAboutRandomWords(shuffle([...infoAboutRandomWords]));
    };

    return (
        !gameCompleted ? (
            <GameField
                columnsNum={Math.ceil(Math.sqrt(infoAboutRandomWords.length))}
                infoAboutRandomWords={infoAboutRandomWords}
                infoAboutSelectedWords={infoAboutSelectedWords}
                successfulPairIds={successfulPairIds}
                successfulSelectedPairId={successfulSelectedPairId}
                handleClick={handleClick}
            />) : (
            <FinalGameField
                score={gameLevel.lastScore}
                handleReplay={handleReplay}
            />)
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
        lastScore: PropTypes.number,
    }).isRequired,
    saveLevelResult: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        saveLevelResult: levelResult => dispatch(gameApiActions.saveLevelResult(levelResult))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withActualGameLevel(GameFieldContainer));
