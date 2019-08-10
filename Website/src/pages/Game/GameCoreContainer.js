import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveLevelResult as saveLevelResultAction } from 'actions/gamesApiActions';
import shuffle from 'helpers/shuffle';
import withReceivedGameLevel from './withReceivedGameLevel';
import GameCore from './GameCore';

function GameCoreContainer({ levelId, wordTranslations }) {
  const [randomWordsInfo, setRandomWordsInfo] = useState([]);
  const [selectedWordIdsMap, setSelectedWordIdsMap] = useState({});
  const [completedPairIdsMap, setCompletedPairIdsMap] = useState({});
  const [selectedCompletedPairId, setSelectedCompletedPairId] = useState(-1);
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

    setRandomWordsInfo(shuffle(wordsInfo));
  }, [wordTranslations]);

  useEffect(() => {
    const numberOfcompletedPairs = Object.keys(completedPairIdsMap).length;
    if (
      numberOfcompletedPairs > 0 &&
      numberOfcompletedPairs === randomWordsInfo.length / 2
    ) {
      setTimeout(setIsGameCompleted, 1000, true);
      setTimeout(setIsResultReady, 1500, true);

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
      );
    }
  }, [
    completedPairIdsMap,
    randomWordsInfo.length,
    levelId,
    openingQuantity,
    dispatch
  ]);

  const handleClick = (pairId, wordId) => () => {
    if (completedPairIdsMap[pairId]) {
      setSelectedCompletedPairId(pairId);
      return;
    }

    const selectedWordIds = Object.keys(selectedWordIdsMap);

    if (
      selectedWordIds.length === 2 ||
      (selectedWordIds.length && selectedWordIds[0].id === wordId)
    ) {
      return;
    }

    if (selectedWordIds.length < 2) {
      setSelectedWordIdsMap(selectedWordIdsMap => ({
        ...selectedWordIdsMap,
        [wordId]: pairId
      }));

      setOpeningQuantity(openingQuantity => openingQuantity + 1);
    }

    if (selectedWordIds.length === 1) {
      if (Object.values(selectedWordIdsMap)[0] === pairId) {
        setSelectedWordIdsMap({});

        setCompletedPairIdsMap(completedPairIdsMap => ({
          ...completedPairIdsMap,
          [pairId]: true
        }));

        setSelectedCompletedPairId(pairId);
      } else {
        setTimeout(setSelectedWordIdsMap, 700, {});
      }
    }
  };

  const handleReplay = () => {
    setRandomWordsInfo(
      shuffle(
        randomWordsInfo.map(randomWordInfo => ({
          ...randomWordInfo,
          isSelected: false,
          isCompleted: false
        }))
      )
    );

    setSelectedWordIdsMap({});
    setCompletedPairIdsMap({});
    setSelectedCompletedPairId(-1);
    setOpeningQuantity(0);
    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
  };

  return (
    <GameCore
      randomWordsInfo={randomWordsInfo}
      selectedWordIdsMap={selectedWordIdsMap}
      completedPairIdsMap={completedPairIdsMap}
      selectedCompletedPairId={selectedCompletedPairId}
      isGameCompleted={isGameCompleted}
      isResultReady={isResultReady}
      score={score}
      handleClick={handleClick}
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
