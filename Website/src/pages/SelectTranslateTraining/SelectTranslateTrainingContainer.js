import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'helpers/shuffle';
import withReceivedGameLevel from 'components/withReceivedGameLevel';
import SelectTranslateTraining from './SelectTranslateTraining';

function SelectTranslateTrainingContainer({ levelId, wordTranslations }) {
  const [wordSets, setWordSets] = useState([]);
  const [currentWordSets, setCurrentWordSets] = useState([]);
  const [currentWordSet, setCurrentWordSet] = useState({
    primaryWordInfo: {
      word: ''
    },
    secondaryWordsInfo: []
  });
  const [rightSelectedWordId, setRightSelectedWordId] = useState(-1);
  const [wrongSelectedWordId, setWrongSelectedWordId] = useState(-1);
  const [isClickDone, setIsClickDone] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const wordsInfo = Array.prototype.concat.apply(
      [],
      shuffle([...wordTranslations])
        .slice(0, 8)
        .map((wordPair, index) => [
          {
            id: index * 2,
            pairId: wordPair.serverId,
            word: wordPair.wordForeign,
            translation: wordPair.wordNative
          },
          {
            id: index * 2 + 1,
            pairId: wordPair.serverId,
            word: wordPair.wordNative,
            translation: wordPair.wordForeign,
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
    if (isGameCompleted) {
      window.setTimeout(() => {
        setIsResultReady(true);
      }, 500);
    }
  }, [isGameCompleted]);

  const handleClick = (pairId, id) => () => {
    if (isClickDone) return;

    if (pairId === currentWordSet.primaryWordInfo.pairId) {
      setRightSelectedWordId(id);

      setCurrentWordSets(wordSets => wordSets.slice(0, -1));
    } else {
      setRightSelectedWordId(
        currentWordSet.secondaryWordsInfo.find(
          secondaryWordInfo =>
            secondaryWordInfo.pairId === currentWordSet.primaryWordInfo.pairId
        ).id
      );
      setWrongSelectedWordId(id);

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
      setRightSelectedWordId(-1);
      setWrongSelectedWordId(-1);
      setIsClickDone(false);
    } else {
      setIsGameCompleted(true);
    }
  };

  const handleReplay = () => {
    const shuffledWordSets = shuffle([...wordSets]);
    setCurrentWordSets(shuffledWordSets);
    setCurrentWordSet(shuffledWordSets[shuffledWordSets.length - 1]);
    setRightSelectedWordId(-1);
    setWrongSelectedWordId(-1);
    setIsClickDone(false);
    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
  };

  return (
    <SelectTranslateTraining
      currentWordSet={currentWordSet}
      rightSelectedWordId={rightSelectedWordId}
      wrongSelectedWordId={wrongSelectedWordId}
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

SelectTranslateTrainingContainer.propTypes = {
  levelId: PropTypes.number.isRequired,
  wordTranslations: PropTypes.arrayOf(
    PropTypes.shape({
      serverId: PropTypes.number.isRequired,
      wordForeign: PropTypes.string.isRequired,
      wordNative: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default withReceivedGameLevel(SelectTranslateTrainingContainer);
