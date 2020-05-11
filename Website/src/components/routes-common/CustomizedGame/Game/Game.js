import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import flatMap from 'src/utils/flatMap';
import shuffle from 'src/utils/shuffle';
import GameField from './GameField';

const CARD_CLOSING_DELAY = 700;
const GAME_COMPLETION_DELAY = 1000;
const GAME_FADE_DELAY = 500;

function Game({ trainingLevel, handleEnd }) {
  const [wordPairs, setWordPairs] = useState([]);
  const [selectedWordPairs, setSelectedWordPairs] = useState([]);
  const [completedPairIdsMap, setCompletedPairIdsMap] = useState({});
  const [selectedCompletedPairId, setSelectedCompletedPairId] = useState(-1);
  const [wordPairIdOpenCountsMap, setWordPairIdOpenCountsMap] = useState({});
  const [gameCompleted, setGameCompleted] = useState(false);

  const resetGameProgress = () => {
    setSelectedWordPairs([]);
    setCompletedPairIdsMap({});
    setSelectedCompletedPairId(-1);
    setWordPairIdOpenCountsMap({});
  };

  const resetGameResult = () => {
    setGameCompleted(false);
  };

  useEffect(() => {
    resetGameProgress();
    resetGameResult();

    const wordPairs = flatMap(trainingLevel.wordTranslations, wordPair => [
      {
        id: uuidv4(),
        pairId: wordPair.serverId,
        word: wordPair.wordForeign,
        onSpeech: wordPair.onSpeech
      },
      {
        id: uuidv4(),
        pairId: wordPair.serverId,
        word: wordPair.wordNative,
        onSpeech: null
      }
    ]);

    setWordPairs(shuffle(wordPairs));
  }, [trainingLevel.wordTranslations]);

  const isGameCompleted = newCompletedPairIdsMap => {
    const numberOfCompletedPairs = Object.keys(newCompletedPairIdsMap).length;
    return (
      numberOfCompletedPairs === wordPairs.length / 2 &&
      numberOfCompletedPairs > 0
    );
  };

  const handleClick = (pairId, id, onSpeech) => async () => {
    if (trainingLevel.voiceOn && onSpeech) {
      onSpeech();
    }

    if (completedPairIdsMap[pairId]) {
      setSelectedCompletedPairId(pairId);
      return;
    }

    if (
      selectedWordPairs.length === 2 ||
      (selectedWordPairs.length && selectedWordPairs[0].id === id)
    ) {
      return;
    }

    if (selectedWordPairs.length < 2) {
      setSelectedWordPairs(selectedWordPairs =>
        selectedWordPairs.concat({
          id,
          pairId
        })
      );

      setWordPairIdOpenCountsMap(wordPairIdOpenCountsMap => ({
        ...wordPairIdOpenCountsMap,
        [pairId]: wordPairIdOpenCountsMap[pairId]
          ? wordPairIdOpenCountsMap[pairId] + 1
          : 1
      }));
    }

    let newCompletedPairIdsMap = completedPairIdsMap;
    if (selectedWordPairs.length === 1) {
      if (selectedWordPairs[0].pairId === pairId) {
        setSelectedWordPairs([]);

        newCompletedPairIdsMap = {
          ...completedPairIdsMap,
          [pairId]: true
        };

        setCompletedPairIdsMap(newCompletedPairIdsMap);
        setSelectedCompletedPairId(pairId);

        if (isGameCompleted(newCompletedPairIdsMap)) {
          setTimeout(() => {
            setGameCompleted(true);
            setTimeout(() => {
              handleEnd(wordPairIdOpenCountsMap);
            }, GAME_FADE_DELAY);
          }, GAME_COMPLETION_DELAY);
        }
      } else {
        setTimeout(() => {
          setSelectedWordPairs([]);
        }, CARD_CLOSING_DELAY);
      }
    }
  };

  return (
    <GameField
      cardSettings={trainingLevel.cardSettings}
      wordPairs={wordPairs}
      selectedWordPairs={selectedWordPairs}
      completedPairIdsMap={completedPairIdsMap}
      selectedCompletedPairId={selectedCompletedPairId}
      gameCompleted={gameCompleted}
      handleClick={handleClick}
    />
  );
}

Game.propTypes = {
  trainingLevel: PropTypes.shape({
    levelId: PropTypes.number.isRequired,
    wordTranslations: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired,
        onSpeech: PropTypes.func
      }).isRequired
    ).isRequired,
    voiceOn: PropTypes.bool.isRequired,
    cardSettings: PropTypes.object.isRequired
  }).isRequired,
  handleEnd: PropTypes.func.isRequired
};

export default Game;
