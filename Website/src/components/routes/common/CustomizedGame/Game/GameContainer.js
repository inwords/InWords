import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { saveLevelResult } from 'src/actions/trainingApiActions';
import shuffle from 'src/utils/shuffle';
import TrainingResult from 'src/components/routes/common/TrainingResult';
import Game from './Game';

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

const GAME_COMPLETED_TIMEOUT = 1000;
const RESULT_READY_TIMEOUT = 500;

function GameContainer({ trainingLevel, onResult, onNextLevel, onReplay }) {
  const [wordPairs, setWordPairs] = useState([]);
  const [recentWordPairs, setRecentWordPairs] = useState([]);
  const [newServerLevelId, setNewServerLevelId] = useState(null);
  const [selectedWordPairs, setSelectedWordPairs] = useState([]);
  const [completedPairIdsMap, setCompletedPairIdsMap] = useState({});
  const [selectedCompletedPairId, setSelectedCompletedPairId] = useState(-1);
  const [wordPairIdOpenCountsMap, setWordPairIdOpenCountsMap] = useState({});
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [score, setScore] = useState(null);
  const [colorPair, setColorPair] = useState(colorPairs[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedWordPairs([]);
    setCompletedPairIdsMap({});
    setSelectedCompletedPairId(-1);
    setWordPairIdOpenCountsMap({});

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

  const handleClick = (pairId, id, onSpeech) => () => {
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

    const numberOfCompletedPairs = Object.keys(newCompletedPairIdsMap).length;
    if (
      numberOfCompletedPairs === wordPairs.length / 2 &&
      numberOfCompletedPairs > 0
    ) {
      const levelId = trainingLevel.levelId;

      const serverLevelId = levelId < 0 ? 0 : levelId;
      dispatch(
        saveLevelResult(
          {
            gameLevelId: newServerLevelId || serverLevelId,
            wordPairIdOpenCounts: wordPairIdOpenCountsMap
          },
          {
            onSuccess: ({ data }) => {
              setTimeout(() => {
                setIsGameCompleted(true);

                setTimeout(() => {
                  setSelectedWordPairs([]);
                  setCompletedPairIdsMap({});
                  setSelectedCompletedPairId(-1);
                  setWordPairIdOpenCountsMap({});
                  setRecentWordPairs(wordPairs);

                  if (onResult) {
                    onResult({ levelId, wordPairs, levelResult: data });
                  }

                  setScore(data.classicCardLevelResult[0].score);
                  setNewServerLevelId(data.classicCardLevelResult[0].levelId);

                  setIsResultReady(true);

                  setColorPair(
                    colorPairs[Math.floor(Math.random() * colorPairs.length)]
                  );
                }, RESULT_READY_TIMEOUT);
              }, GAME_COMPLETED_TIMEOUT);
            }
          }
        )
      );
    }
  };

  const handleNextLevel = () => {
    onNextLevel();

    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
    setNewServerLevelId(null);
  };

  const handleReplay = () => {
    onReplay();

    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
    setWordPairs(shuffle([...recentWordPairs]));
  };

  return !isResultReady ? (
    <Game
      cardSettings={trainingLevel.cardSettings}
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
      colorPair={colorPair}
      handleNextLevel={handleNextLevel}
      handleReplay={handleReplay}
    />
  );
}

GameContainer.propTypes = {
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
  onResult: PropTypes.func,
  onNextLevel: PropTypes.func.isRequired,
  onReplay: PropTypes.func.isRequired
};

export default GameContainer;
