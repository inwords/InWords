import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import gamesApiActions from '../../actions/gamesApiActions';
import shuffle from './helpers/shuffle';
import withReceivedGameLevel from './withReceivedGameLevel';
import Game from './Game';

function GameContainer({ wordTranslations }) {
    const [randomWordsInfo, setRandomWordsInfo] = useState([]);
    const [selectedWordsInfo, setSelectedWordsInfo] = useState([]);
    const [completedPairIds, setCompletedPairIds] = useState([]);
    const [completedSelectedPairId, setCompletedSelectedPairId] = useState(-1);

    useEffect(() => {
        const shuffledWordTranslations = shuffle([...wordTranslations]);
        const wordsInfo = Array.prototype.concat.apply([], shuffledWordTranslations.slice(0, 8).map((wordPair, index) =>
            [{
                id: index * 2,
                pairId: wordPair.serverId,
                word: wordPair.wordForeign,
                isCompleted: false,
                isSelected: false
            }, {
                id: index * 2 + 1,
                pairId: wordPair.serverId,
                word: wordPair.wordNative,
                isCompleted: false,
                isSelected: false
            }]
        ));

        setRandomWordsInfo(shuffle(wordsInfo));
    }, [wordTranslations]);

    const handleClick = (pairId, wordId) => () => {
        if (completedPairIds.find(completedPairId => completedPairId === pairId)) {
            setCompletedSelectedPairId(pairId);
            return;
        }

        if (selectedWordsInfo.length === 2 ||
            selectedWordsInfo.find(selectedWordInfo => selectedWordInfo.id === wordId)) {
            return;
        }

        if (selectedWordsInfo.length < 2) {
            setSelectedWordsInfo([...selectedWordsInfo, {
                id: wordId,
                pairId: pairId
            }]);

            setRandomWordsInfo(randomWordsInfo.map(randomWordInfo => {
                if (randomWordInfo.id === wordId) {
                    return {
                        ...randomWordInfo,
                        isSelected: true
                    };
                }

                return randomWordInfo;
            }));
        }

        if (selectedWordsInfo.length === 1) {
            if (selectedWordsInfo[0].pairId === pairId) {
                setSelectedWordsInfo([]);
                setCompletedPairIds([...completedPairIds, pairId]);
                setCompletedSelectedPairId(pairId);

                setRandomWordsInfo(randomWordsInfo.map(randomWordInfo => {
                    if (randomWordInfo.pairId === pairId) {
                        return {
                            ...randomWordInfo,
                            isCompleted: true
                        };
                    }

                    return randomWordInfo;
                }));
            } else {
                setTimeout(() => {
                    setSelectedWordsInfo([]);

                    setRandomWordsInfo(randomWordsInfo.map(randomWordInfo => {
                        if (selectedWordsInfo.find(selectedWordInfo => selectedWordInfo.pairId === randomWordInfo.pairId)) {
                            return {
                                ...randomWordInfo,
                                isSelected: false
                            };
                        }

                        return randomWordInfo;
                    }));
                }, 700);
            }
        }
    };

    return (
        <Game
            randomWordsInfo={randomWordsInfo}
            handleClick={handleClick}
            completedSelectedPairId={completedSelectedPairId}
        />
    );
}

GameContainer.propTypes = {
    wordTranslations: PropTypes.arrayOf(PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired
    })).isRequired
};

export default withReceivedGameLevel(GameContainer);
