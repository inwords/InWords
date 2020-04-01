import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import shuffle from 'src/utils/shuffle';
import { setSnackbar } from 'src/actions/commonActions';
import { saveLevelResult } from 'src/actions/trainingApiActions';
import TrainingResult from 'src/components/routes-common/TrainingResult';
import GameField from './GameField';

const GAME_COMPLETED_TIMEOUT = 1000;
const RESULT_READY_TIMEOUT = 500;

const colorPairs = [
  ['#F44336', '#FFCDD2'],
  ['#E91E63', '#F8BBD0'],
  ['#9C27B0', '#E1BEE7'],
  ['#673AB7', '#D1C4E9'],
  ['#3F51B5', '#C5CAE9'],
  ['#2196F3', '#BBDEFB'],
  ['#03A9F4', '#B3E5FC'],
  ['#00BCD4', '#B2EBF2'],
  ['#009688', '#B2DFDB'],
  ['#4CAF50', '#C8E6C9'],
  ['#8BC34A', '#DCEDC8'],
  ['#CDDC39', '#F0F4C3'],
  ['#FFC107', '#FFECB3'],
  ['#FF9800', '#FFE0B2'],
  ['#FF5722', '#FFCCBC']
];

const getRandomColorPair = () =>
  colorPairs[Math.floor(Math.random() * colorPairs.length)];

function Game({
  trainingLevel,
  handleResultSuccess,
  handleNextLevel,
  handleReplay
}) {
  const [wordPairs, setWordPairs] = useState([]);
  const [recentWordPairs, setRecentWordPairs] = useState([]);
  const [newServerLevelId, setNewServerLevelId] = useState(null);
  const [selectedWordPairs, setSelectedWordPairs] = useState([]);
  const [completedPairIdsMap, setCompletedPairIdsMap] = useState({});
  const [selectedCompletedPairId, setSelectedCompletedPairId] = useState(-1);
  const [wordPairIdOpenCountsMap, setWordPairIdOpenCountsMap] = useState({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const [score, setScore] = useState(null);
  const [colorPair, setColorPair] = useState(colorPairs[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedWordPairs([]);
    setCompletedPairIdsMap({});
    setSelectedCompletedPairId(-1);
    setWordPairIdOpenCountsMap({});
    setGameCompleted(false);
    setResultReady(false);
    setScore(null);

    const wordPairs = Array.prototype.concat.apply(
      [],
      trainingLevel.wordTranslations.map(wordPair => [
        {
          id: uuidv4(),
          pairId: wordPair.serverId,
          word: wordPair.wordForeign,
          onSpeech: wordPair.onSpeech
        },
        {
          id: uuidv4(),
          pairId: wordPair.serverId,
          word: wordPair.wordNative
        }
      ])
    );

    setWordPairs(shuffle(wordPairs));
  }, [trainingLevel.wordTranslations]);

  const isGameCompleted = newCompletedPairIdsMap => {
    const numberOfCompletedPairs = Object.keys(newCompletedPairIdsMap).length;
    return (
      numberOfCompletedPairs === wordPairs.length / 2 &&
      numberOfCompletedPairs > 0
    );
  };

  const handleGameEnd = async () => {
    const levelId = trainingLevel.levelId;

    const serverLevelId = levelId < 0 ? 0 : levelId;

    try {
      const data = await dispatch(
        saveLevelResult({
          gameLevelId: newServerLevelId || serverLevelId,
          wordPairIdOpenCounts: wordPairIdOpenCountsMap
        })
      );

      setTimeout(() => {
        setGameCompleted(true);

        setTimeout(() => {
          setSelectedWordPairs([]);
          setCompletedPairIdsMap({});
          setSelectedCompletedPairId(-1);
          setWordPairIdOpenCountsMap({});
          setRecentWordPairs(wordPairs);

          if (handleResultSuccess) {
            handleResultSuccess({ levelId, wordPairs, levelResult: data });
          }

          setScore(data.classicCardLevelResult[0].score);
          setNewServerLevelId(data.classicCardLevelResult[0].levelId);

          setResultReady(true);
          setColorPair(getRandomColorPair());
        }, RESULT_READY_TIMEOUT);
      }, GAME_COMPLETED_TIMEOUT);
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось сохранить результат' }));
    }
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
      } else {
        setTimeout(() => {
          setSelectedWordPairs([]);
        }, 700);
      }
    }

    if (isGameCompleted(newCompletedPairIdsMap)) {
      await handleGameEnd();
    }
  };

  const handleEnhancedNextLevel = () => {
    handleNextLevel();

    setGameCompleted(false);
    setResultReady(false);
    setScore(null);
    setNewServerLevelId(null);
  };

  const handleEnhancedReplay = () => {
    handleReplay();

    setGameCompleted(false);
    setResultReady(false);
    setScore(null);
    setWordPairs(shuffle([...recentWordPairs]));
  };

  return !resultReady ? (
    <GameField
      cardSettings={trainingLevel.cardSettings}
      wordPairs={wordPairs}
      selectedWordPairs={selectedWordPairs}
      completedPairIdsMap={completedPairIdsMap}
      selectedCompletedPairId={selectedCompletedPairId}
      gameCompleted={gameCompleted}
      handleClick={handleClick}
    />
  ) : (
    <TrainingResult
      wordPairs={wordPairs}
      score={score}
      colorPair={colorPair}
      handleNextLevel={handleEnhancedNextLevel}
      handleReplay={handleEnhancedReplay}
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
  handleResultSuccess: PropTypes.func,
  handleNextLevel: PropTypes.func.isRequired,
  handleReplay: PropTypes.func.isRequired
};

export default Game;
