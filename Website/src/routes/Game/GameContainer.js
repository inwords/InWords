import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveTrainingLevelResult } from 'src/actions/trainingApiActions';
import shuffle from 'src/utils/shuffle';
import withLocalStorageData from 'src/HOCs/withLocalStorageData';
import withReceivedTrainingLevel from 'src/HOCs/withReceivedTrainingLevel';
import Game from './Game';
import TrainingResult from 'src/layout/TrainingResult';

const synth = window.speechSynthesis;
const lang = 'en-US';

function GameContainer({ levelId, wordTranslations, localData }) {
  const [wordPairs, setWordPairs] = useState([]);
  const [voice, setVoice] = useState(false);
  const [selectedWordPairs, setSelectedWordPairs] = useState([]);
  const [completedPairIdsMap, setCompletedPairIdsMap] = useState({});
  const [selectedCompletedPairId, setSelectedCompletedPairId] = useState(-1);
  const [wordPairIdOpenCountsMap, setWordPairIdOpenCountsMap] = useState({});
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [score, setScore] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const trainingSettings =
      (localData.trainingsSettings && localData.trainingsSettings[0]) || {};

    setVoice(trainingSettings.voice);

    const wordPairs = Array.prototype.concat.apply(
      [],
      shuffle([...wordTranslations])
        .slice(0, trainingSettings.quantity || 8)
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

    setWordPairs(shuffle(wordPairs));
  }, [wordTranslations, localData]);

  useEffect(() => {
    let timer1;
    let timer2;

    const numberOfcompletedPairs = Object.keys(completedPairIdsMap).length;
    if (
      numberOfcompletedPairs > 0 &&
      numberOfcompletedPairs === wordPairs.length / 2
    ) {
      timer1 = setTimeout(() => {
        setIsGameCompleted(true);
      }, 1000);

      timer2 = setTimeout(() => {
        setIsResultReady(true);

        setSelectedWordPairs([]);
        setCompletedPairIdsMap({});
        setSelectedCompletedPairId(-1);
        setWordPairIdOpenCountsMap({});
      }, 1500);

      const gameLevelId = levelId < 0 ? 0 : levelId;
      dispatch(
        saveTrainingLevelResult(
          {
            gameLevelId,
            wordPairIdOpenCounts: wordPairIdOpenCountsMap
          },
          data => {
            setScore(data.classicCardLevelResult[0].score);
          }
        )
      );
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [
    completedPairIdsMap,
    wordPairs,
    levelId,
    wordPairIdOpenCountsMap,
    dispatch
  ]);

  const handleClick = (pairId, id, word) => () => {
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

    if (selectedWordPairs.length === 1) {
      if (selectedWordPairs[0].pairId === pairId) {
        setSelectedWordPairs([]);

        setCompletedPairIdsMap(completedPairIdsMap => ({
          ...completedPairIdsMap,
          [pairId]: true
        }));

        setSelectedCompletedPairId(pairId);
      } else {
        window.setTimeout(() => {
          setSelectedWordPairs([]);
        }, 700);
      }
    }

    if (voice & (id % 2 == 0)) {
      setTimeout(() => {
        if (synth.speaking) {
          synth.cancel();
        }

        const speech = new SpeechSynthesisUtterance(word);
        speech.lang = lang;
        synth.speak(speech);
      }, 0);
    }
  };

  const handleReplay = () => {
    setWordPairs(wordInfo => shuffle([...wordInfo]));
    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
  };

  return !isResultReady ? (
    <Game
      wordPairs={wordPairs}
      selectedWordPairs={selectedWordPairs}
      completedPairIdsMap={completedPairIdsMap}
      selectedCompletedPairId={selectedCompletedPairId}
      isGameCompleted={isGameCompleted}
      handleClick={handleClick}
    />
  ) : (
    <TrainingResult
      wordPairs={wordPairs}
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
  ).isRequired,
  localData: PropTypes.shape({
    trainingsSettings: PropTypes.object
  })
};

export default withReceivedTrainingLevel(
  withLocalStorageData(GameContainer, ['trainingsSettings'])
);
