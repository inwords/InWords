import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveLevelResult } from 'src/actions/gamesApiActions';
import shuffle from 'src/utils/shuffle';
import withReceivedGameLevel from 'src/HOCs/withReceivedGameLevel';
import TrainingWrapper from 'src/components/TrainingWrapper';
import Game from './Game';
import TrainingResult from 'src/components/TrainingResult';

function GameContainer({ levelId, wordTranslations }) {
  const [wordsInfo, setWordsInfo] = useState([]);
  const [selectedWordsInfo, setSelectedWordsInfo] = useState([]);
  const [completedPairIdsInfo, setCompletedPairIdsInfo] = useState({});
  const [selectedCompletedPairId, setSelectedCompletedPairId] = useState(-1);
  const [wordPairIdOpenCounts, setWordPairIdOpenCounts] = useState({});
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
    const numberOfcompletedPairs = Object.keys(completedPairIdsInfo).length;
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
            gameLevelId: levelId,
            wordPairIdOpenCounts
          },
          data => {
            setScore(data.score);
          }
        )
      );
    }
  }, [
    completedPairIdsInfo,
    wordsInfo.length,
    levelId,
    wordPairIdOpenCounts,
    dispatch
  ]);

  const handleClick = (pairId, id) => () => {
    if (completedPairIdsInfo[pairId]) {
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

      setWordPairIdOpenCounts(wordPairIdOpenCounts => ({
        ...wordPairIdOpenCounts,
        [pairId]: wordPairIdOpenCounts[pairId]
          ? wordPairIdOpenCounts[pairId] + 1
          : 1
      }));
    }

    if (selectedWordsInfo.length === 1) {
      if (selectedWordsInfo[0].pairId === pairId) {
        setSelectedWordsInfo([]);

        setCompletedPairIdsInfo(completedPairIdsInfo => ({
          ...completedPairIdsInfo,
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
    setCompletedPairIdsInfo({});
    setSelectedCompletedPairId(-1);
    setWordPairIdOpenCounts({});
    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
  };

  return (
    <TrainingWrapper>
      {!isResultReady ? (
        <Game
          wordsInfo={wordsInfo}
          selectedWordsInfo={selectedWordsInfo}
          completedPairIdsInfo={completedPairIdsInfo}
          selectedCompletedPairId={selectedCompletedPairId}
          isGameCompleted={isGameCompleted}
          handleClick={handleClick}
        />
      ) : (
        <TrainingResult score={score} handleReplay={handleReplay} />
      )}
    </TrainingWrapper>
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
