import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveLevelResult as saveLevelResultAction } from 'actions/gamesApiActions';
import shuffle from 'helpers/shuffle';
import withReceivedGameLevel from './withReceivedGameLevel';
import GameCore from './GameCore';

function GameCoreContainer({ levelId, wordTranslations }) {
  const [randomWordsInfo, setRandomWordsInfo] = useState([]);
  const [selectedWordsInfo, setSelectedWordsInfo] = useState([]);
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

  const handleClick = (pairId, id) => () => {
    if (completedPairIdsMap[pairId]) {
      setSelectedCompletedPairId(pairId);
      return;
    }

    if (
      selectedWordsInfo.length === 2 ||
      (selectedWordsInfo.length && selectedWordsInfo[0].id === id)
    ) {
      return;
    }

    if (selectedWordsInfo.length < 2) {
      setSelectedWordsInfo(selectedWordsInfo =>
        selectedWordsInfo.concat({
          id,
          pairId
        })
      );

      setOpeningQuantity(openingQuantity => openingQuantity + 1);
    }

    if (selectedWordsInfo.length === 1) {
      if (selectedWordsInfo[0].pairId === pairId) {
        setSelectedWordsInfo([]);

        setCompletedPairIdsMap(completedPairIdsMap => ({
          ...completedPairIdsMap,
          [pairId]: true
        }));

        setSelectedCompletedPairId(pairId);
      } else {
        setTimeout(setSelectedWordsInfo, 700, []);
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

    setSelectedWordsInfo([]);
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
      selectedWordsInfo={selectedWordsInfo}
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
