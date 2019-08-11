import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveLevelResult as saveLevelResultAction } from 'actions/gamesApiActions';
import shuffle from 'helpers/shuffle';
import withReceivedGameLevel from './withReceivedGameLevel';
import GameCore from './GameCore';

function GameCoreContainer({ levelId, wordTranslations }) {
  const [wordSets, setWordSets] = useState([]);
  const [currentWordSet, setCurrentWordSet] = useState({
    primaryWordInfo: {
      word: ''
    },
    secondaryWordsInfo: []
  });
  const [currentWordSetNumber, setCurrentWordSetNumber] = useState(0);
  const [wordsStatusColorsMap, setWordsStatusColorsMap] = useState({});
  const [isClickDone, setIsClickDone] = useState(false);
  const [openingQuantity, setOpeningQuantity] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [score, setScore] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const shuffledWordTranslations = shuffle([...wordTranslations]);
    const wordsInfo = Array.prototype.concat.apply(
      [],
      shuffledWordTranslations.slice(0, 8).map((wordPair, index) => [
        {
          id: index * 2,
          pairId: wordPair.serverId,
          word: wordPair.wordForeign
        },
        {
          id: index * 2 + 1,
          pairId: wordPair.serverId,
          word: wordPair.wordNative
        }
      ])
    );

    setWordSets(
      shuffledWordTranslations.map((wordPair, index) => ({
        primaryWordInfo: {
          id: index * 2,
          pairId: wordPair.serverId,
          word: wordPair.wordForeign
        },
        secondaryWordsInfo: wordsInfo.filter(
          wordInfo => wordInfo.id !== index * 2 && wordInfo.id % 2 !== 0
        )
      }))
    );

    //setCurrentWordSet(wordSets[0]);
  }, [wordTranslations]);

  useEffect(() => {
    if (wordSets.length) {
      setCurrentWordSet({
        primaryWordInfo: wordSets[0].primaryWordInfo,
        secondaryWordsInfo: shuffle([
          ...wordSets[0].secondaryWordsInfo
        ])
      });
    }
  }, [wordSets]);

  useEffect(() => {
    if (wordSets.length > 0 && currentWordSetNumber >= wordSets.length) {
      setTimeout(setIsGameCompleted, 1000, true);
      /* setTimeout(setIsResultReady, 1500, true);

      const saveLevelResult = (levelResult, actionOnSuccess) => {
        dispatch(saveLevelResultAction(levelResult, actionOnSuccess));
      };

      saveLevelResult(
        {
          levelId,
          openingQuantity,
          wordsCount: randomWordsInfo.length
        },
        data => {
          setScore(data.score);
        }
      ); */
    }
  }, [wordSets, currentWordSetNumber, isClickDone]);

  const handleClick = (pairId, id) => () => {
    if (pairId === currentWordSet.primaryWordInfo.pairId) {
      setWordsStatusColorsMap({
        [id]: 'primary'
      });
    } else {
      setWordsStatusColorsMap({
        [currentWordSet.primaryWordInfo.id + 1]: 'primary',
        [id]: 'secondary'
      });
    }

    setIsClickDone(true);
  };

  const handleOpenNextSet = () => {
    setCurrentWordSetNumber(currentWordSetNumber => currentWordSetNumber + 1);
    if (currentWordSetNumber < wordSets.length - 1) {
      setCurrentWordSet({
        primaryWordInfo: wordSets[currentWordSetNumber + 1].primaryWordInfo,
        secondaryWordsInfo: shuffle([
          ...wordSets[currentWordSetNumber + 1].secondaryWordsInfo
        ])
      });

      setWordsStatusColorsMap({});
      setIsClickDone(false);
    }
  };

  const handleReplay = () => {
    /* setRandomWordsInfo(
      shuffle(
        randomWordsInfo.map(randomWordInfo => ({
          ...randomWordInfo,
          isSelected: false,
          isCompleted: false
        }))
      )
    ); */

    setOpeningQuantity(0);
    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
  };

  return (
    <GameCore
      currentWordSet={currentWordSet}
      wordsStatusColorsMap={wordsStatusColorsMap}
      isClickDone={isClickDone}
      isGameCompleted={isGameCompleted}
      isResultReady={isResultReady}
      score={score}
      handleClick={handleClick}
      handleOpenNextSet={handleOpenNextSet}
      handleReplay={handleReplay}
    />
  );
}

GameCoreContainer.propTypes = {
  levelId: PropTypes.number.isRequired,
  wordTranslations: PropTypes.arrayOf(
    PropTypes.shape({
      serverId: PropTypes.number.isRequired,
      wordForeign: PropTypes.string.isRequired,
      wordNative: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default withReceivedGameLevel(GameCoreContainer);
