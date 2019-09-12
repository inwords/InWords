import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveLevelResult } from 'actions/gamesApiActions';
import shuffle from 'helpers/shuffle';
import withReceivedGameLevel from 'components/withReceivedGameLevel';
import Game from './Game';

function GameContainer({ levelId, wordTranslations }) {
  const [wordsInfo, setWordsInfo] = useState([]);
  const [selectedWordsInfo, setSelectedWordsInfo] = useState([]);
  const [completedPairIdsMap, setCompletedPairIdsMap] = useState({});
  const [selectedCompletedPairId, setSelectedCompletedPairId] = useState(-1);
  const [openingQuantity, setOpeningQuantity] = useState(0);
  const [wordsStatisticsMap, setWordsStatisticsMap] = useState([]);
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

    setWordsInfo(shuffle(wordsInfo));
  }, [wordTranslations]);

  useEffect(() => {
    const numberOfcompletedPairs = Object.keys(completedPairIdsMap).length;
    if (
      numberOfcompletedPairs > 0 &&
      numberOfcompletedPairs === wordsInfo.length / 2
    ) {
      window.setTimeout(() => {
        setIsGameCompleted(true);
      }, 1000);

      window.setTimeout(() => {
        setIsResultReady(true);
      }, 1500);

      dispatch(
        saveLevelResult(
          {
            levelId,
            openingQuantity,
            wordsCount: wordsInfo.length
          },
          data => {
            setScore(data.score);
          }
        )
      );
    }
  }, [
    completedPairIdsMap,
    wordsInfo.length,
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

      setWordsStatisticsMap(wordsStatisticsMap => ({
        ...wordsStatisticsMap,
        [pairId]: wordsStatisticsMap[pairId]
          ? wordsStatisticsMap[pairId] + 1
          : 1
      }));

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
        window.setTimeout(() => {
          setSelectedWordsInfo([]);
        }, 700);
      }
    }
  };

  const handleReplay = () => {
    setWordsInfo(wordInfo => shuffle([...wordInfo]));
    setSelectedWordsInfo([]);
    setCompletedPairIdsMap({});
    setSelectedCompletedPairId(-1);
    setOpeningQuantity(0);
    setWordsStatisticsMap({});
    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
  };

  return (
    <Game
      wordsInfo={wordsInfo}
      selectedWordsInfo={selectedWordsInfo}
      completedPairIdsMap={completedPairIdsMap}
      selectedCompletedPairId={selectedCompletedPairId}
      isGameCompleted={isGameCompleted}
      isResultReady={isResultReady}
      handleClick={handleClick}
      score={score}
      handleReplay={handleReplay}
    />
  );
}

GameContainer.propTypes = {
  levelId: PropTypes.number.isRequired,
  wordTranslations: PropTypes.arrayOf(
    PropTypes.shape({
      serverId: PropTypes.number.isRequired,
      wordForeign: PropTypes.string.isRequired,
      wordNative: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default withReceivedGameLevel(GameContainer);
