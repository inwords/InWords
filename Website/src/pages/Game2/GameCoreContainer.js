import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveLevelResult as saveLevelResultAction } from 'actions/gamesApiActions';
import shuffle from 'helpers/shuffle';
import withReceivedGameLevel from './withReceivedGameLevel';
import GameCore from './GameCore';

function GameCoreContainer({ levelId, wordTranslations }) {
  const [wordSets, setWordSets] = useState([]);
  const [currentWordSets, setCurrentWordSets] = useState([]);
  const [currentWordSet, setCurrentWordSet] = useState({
    primaryWordInfo: {
      word: ''
    },
    secondaryWordsInfo: []
  });
  const [wordsStatusColorsMap, setWordsStatusColorsMap] = useState({});
  const [isClickDone, setIsClickDone] = useState(false);
  const [openingQuantity, setOpeningQuantity] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [score, setScore] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const wordsInfo = Array.prototype.concat.apply(
      [],
      shuffle([...wordTranslations])
        .slice(0, 8)
        .map((wordPair, index) => [
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

    const foreignWordsInfo = wordsInfo.filter(
      wordInfo => wordInfo.id % 2 === 0
    );
    const nativeWordsInfo = wordsInfo.filter(wordInfo => wordInfo.id % 2 !== 0);

    const foreignSets = foreignWordsInfo.map(foreignWordInfo => ({
      primaryWordInfo: foreignWordInfo,
      secondaryWordsInfo: nativeWordsInfo
    }));
    const nativeSets = nativeWordsInfo.map(nativeWordInfo => ({
      primaryWordInfo: nativeWordInfo,
      secondaryWordsInfo: foreignWordsInfo
    }));

    setWordSets([...foreignSets, ...nativeSets]);

    const shuffledWordSets = shuffle([...foreignSets, ...nativeSets]);
    setCurrentWordSets(shuffledWordSets);
    setCurrentWordSet(shuffledWordSets[shuffledWordSets.length - 1]);
  }, [wordTranslations]);

  useEffect(() => {
    if (currentWordSets.length === 0 && wordSets.length !== 0) {
      setTimeout(setIsGameCompleted, 1000, true);
      setTimeout(setIsResultReady, 1500, true);

      /* const saveLevelResult = (levelResult, actionOnSuccess) => {
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
  }, [currentWordSets.length, wordSets.length]);

  const handleClick = (pairId, id) => () => {
    if (pairId === currentWordSet.primaryWordInfo.pairId) {
      setWordsStatusColorsMap({
        [id]: 'primary'
      });

      setCurrentWordSets(wordSets => wordSets.slice(0, -1));
    } else {
      setWordsStatusColorsMap({
        [currentWordSet.secondaryWordsInfo.find(
          secondaryWordInfo =>
            secondaryWordInfo.pairId === currentWordSet.primaryWordInfo.pairId
        ).id]: 'primary',
        [id]: 'secondary'
      });

      setCurrentWordSets(currentWordSets => shuffle([...currentWordSets]));
    }

    setIsClickDone(true);
  };

  const handleOpenNextSet = () => {
    if (currentWordSets.length > 0) {
      setCurrentWordSet({
        primaryWordInfo:
          currentWordSets[currentWordSets.length - 1].primaryWordInfo,
        secondaryWordsInfo: shuffle([
          ...currentWordSets[currentWordSets.length - 1].secondaryWordsInfo
        ])
      });
      setWordsStatusColorsMap({});
      setIsClickDone(false);
    }
  };

  const handleReplay = () => {
    const shuffledWordSets = shuffle([...wordSets]);
    setCurrentWordSets(shuffledWordSets);
    setCurrentWordSet(shuffledWordSets[shuffledWordSets.length - 1]);
    setWordsStatusColorsMap({});
    setIsClickDone(false);
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
