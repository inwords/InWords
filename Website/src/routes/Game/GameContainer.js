import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveTrainingLevelResult } from 'src/actions/trainingApiActions';
import { removeTrainingLevelWordPairs } from 'src/actions/trainingActions';
import shuffle from 'src/utils/shuffle';
import useDialog from 'src/hooks/useDialog';
import withReceivedTrainingLevel from 'src/HOCs/withReceivedTrainingLevel';
import GamePairsDialog from './GamePairsDialog';
import Game from './Game';
import TrainingResult from 'src/layout/TrainingResult';

function GameContainer({ levelId, wordTranslations, listOn }) {
  const [wordPairs, setWordPairs] = useState([]);
  const [recentWordPairs, setRecentWordPairs] = useState([]);
  const [newServerLevelId, setNewServerLevelId] = useState();
  const [selectedWordPairs, setSelectedWordPairs] = useState([]);
  const [completedPairIdsMap, setCompletedPairIdsMap] = useState({});
  const [selectedCompletedPairId, setSelectedCompletedPairId] = useState(-1);
  const [wordPairIdOpenCountsMap, setWordPairIdOpenCountsMap] = useState({});
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [score, setScore] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const wordPairs = Array.prototype.concat.apply(
      [],
      wordTranslations.map(wordPair => [
        {
          id: `foreign-${wordPair.serverId}`,
          pairId: wordPair.serverId,
          word: wordPair.wordForeign,
          onSpeech: wordPair.onSpeech
        },
        {
          id: `native-${wordPair.serverId}`,
          pairId: wordPair.serverId,
          word: wordPair.wordNative
        }
      ])
    );

    setWordPairs(shuffle(wordPairs));
  }, [wordTranslations, levelId]);

  useEffect(() => {
    let timer1;
    let timer2;

    const numberOfCompletedPairs = Object.keys(completedPairIdsMap).length;
    if (
      numberOfCompletedPairs > 0 &&
      numberOfCompletedPairs === wordPairs.length / 2
    ) {
      const serverLevelId = levelId < 0 ? 0 : levelId;
      dispatch(
        saveTrainingLevelResult(
          {
            gameLevelId: newServerLevelId || serverLevelId,
            wordPairIdOpenCounts: wordPairIdOpenCountsMap
          },
          data => {
            timer1 = setTimeout(() => {
              setIsGameCompleted(true);
            }, 1000);

            timer2 = setTimeout(() => {
              setSelectedWordPairs([]);
              setCompletedPairIdsMap({});
              setSelectedCompletedPairId(-1);
              setWordPairIdOpenCountsMap({});
              setRecentWordPairs(wordPairs);

              if (levelId <= 0) {
                dispatch(
                  removeTrainingLevelWordPairs(
                    levelId,
                    wordPairs.map(wordPair => wordPair.pairId)
                  )
                );
              }

              setScore(data.classicCardLevelResult[0].score);
              setNewServerLevelId(data.classicCardLevelResult[0].levelId);

              setIsResultReady(true);
            }, 1500);
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
    newServerLevelId,
    wordPairIdOpenCountsMap,
    dispatch
  ]);

  const handleClick = (pairId, id, onSpeech) => () => {
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

    if (onSpeech) {
      onSpeech();
    }
  };

  const { open, handleOpen, handleClose } = useDialog(listOn);

  const prepareToNextLevel = () => {
    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
    setNewServerLevelId(undefined);

    if (listOn) {
      handleOpen();
    }
  };

  const handleReplay = () => {
    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
    setWordPairs(shuffle([...recentWordPairs]));
  };

  return !isResultReady ? (
    <Fragment>
      <Game
        wordPairs={wordPairs}
        selectedWordPairs={selectedWordPairs}
        completedPairIdsMap={completedPairIdsMap}
        selectedCompletedPairId={selectedCompletedPairId}
        isGameCompleted={isGameCompleted}
        handleClick={handleClick}
      />
      <GamePairsDialog
        open={open}
        handleClose={handleClose}
        wordPairs={wordTranslations}
      />
    </Fragment>
  ) : (
    <TrainingResult
      wordPairs={wordPairs}
      score={score}
      prepareToNextLevel={prepareToNextLevel}
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
      wordNative: PropTypes.string.isRequired,
      onSpeech: PropTypes.func
    }).isRequired
  ).isRequired,
  listOn: PropTypes.bool.isRequired
};

export default withReceivedTrainingLevel(GameContainer);
