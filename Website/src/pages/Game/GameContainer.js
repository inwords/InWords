import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveLevelResult as saveLevelResultAction } from '../../actions/gamesApiActions';
import shuffle from './helpers/shuffle';
import withReceivedGameLevel from './withReceivedGameLevel';
import Game from './Game';

function GameContainer({ gameLevel }) {
  const [randomWordsInfo, setRandomWordsInfo] = useState([]);
  const [selectedWordsInfo, setSelectedWordsInfo] = useState([]);
  const [completedPairIds, setCompletedPairIds] = useState([]);
  const [selectedCompletedPairId, setSelectedCompletedPairId] = useState(-1);
  const [closuresQuantity, setClosuresQuantity] = useState(0);
  const [isResultReady, setIsResultReady] = React.useState(false);
  const [score, setScore] = useState(null);

  const dispatch = useDispatch();
  const saveLevelResult = useCallback(
    (levelResult, actionOnSuccess) =>
      dispatch(saveLevelResultAction(levelResult, actionOnSuccess)),
    [dispatch]
  );

  useEffect(() => {
    const shuffledWordTranslations = shuffle([...gameLevel.wordTranslations]);
    const wordsInfo = Array.prototype.concat.apply(
      [],
      shuffledWordTranslations.slice(0, 8).map((wordPair, index) => [
        {
          id: index * 2,
          pairId: wordPair.serverId,
          word: wordPair.wordForeign,
          isCompleted: false,
          isSelected: false,
        },
        {
          id: index * 2 + 1,
          pairId: wordPair.serverId,
          word: wordPair.wordNative,
          isCompleted: false,
          isSelected: false,
        },
      ])
    );

    setRandomWordsInfo(shuffle(wordsInfo));
  }, [gameLevel.wordTranslations]);

  useEffect(() => {
    if (
      completedPairIds.length > 0 &&
      completedPairIds.length === randomWordsInfo.length / 2
    ) {
      setTimeout(() => {
        setIsResultReady(true);
      }, 400);

      saveLevelResult(
        {
          levelId: gameLevel.levelId,
          openingQuantity: closuresQuantity * 2 + randomWordsInfo.length,
          wordsCount: randomWordsInfo.length,
        },
        data => setScore(data.score)
      );
    }
  }, [
    completedPairIds.length,
    randomWordsInfo.length,
    gameLevel.levelId,
    closuresQuantity,
    saveLevelResult,
  ]);

  const handleClick = (pairId, wordId) => () => {
    if (completedPairIds.find(completedPairId => completedPairId === pairId)) {
      setSelectedCompletedPairId(pairId);
      return;
    }

    if (
      selectedWordsInfo.length === 2 ||
      selectedWordsInfo.find(selectedWordInfo => selectedWordInfo.id === wordId)
    ) {
      return;
    }

    if (selectedWordsInfo.length < 2) {
      setSelectedWordsInfo([
        ...selectedWordsInfo,
        {
          id: wordId,
          pairId: pairId,
        },
      ]);

      setRandomWordsInfo(
        randomWordsInfo.map(randomWordInfo => {
          if (randomWordInfo.id === wordId) {
            return {
              ...randomWordInfo,
              isSelected: true,
            };
          }

          return randomWordInfo;
        })
      );
    }

    if (selectedWordsInfo.length === 1) {
      if (selectedWordsInfo[0].pairId === pairId) {
        setSelectedWordsInfo([]);
        setCompletedPairIds([...completedPairIds, pairId]);
        setSelectedCompletedPairId(pairId);

        setRandomWordsInfo(
          randomWordsInfo.map(randomWordInfo => {
            if (randomWordInfo.pairId === pairId) {
              return {
                ...randomWordInfo,
                isCompleted: true,
              };
            }

            return randomWordInfo;
          })
        );
      } else {
        setTimeout(() => {
          setSelectedWordsInfo([]);

          setRandomWordsInfo(
            randomWordsInfo.map(randomWordInfo => {
              if (
                selectedWordsInfo.find(
                  selectedWordInfo =>
                    selectedWordInfo.pairId === randomWordInfo.pairId
                )
              ) {
                return {
                  ...randomWordInfo,
                  isSelected: false,
                };
              }

              return randomWordInfo;
            })
          );

          setClosuresQuantity(closuresQuantity + 1);
        }, 700);
      }
    }
  };

  const handleReplay = () => {
    setRandomWordsInfo(
      shuffle(
        randomWordsInfo.map(randomWordInfo => {
          return {
            ...randomWordInfo,
            isSelected: false,
            isCompleted: false,
          };
        })
      )
    );

    setSelectedWordsInfo([]);
    setCompletedPairIds([]);
    setSelectedCompletedPairId(-1);
    setClosuresQuantity(0);
    setIsResultReady(false);
    setScore(null);
  };

  return (
    <Game
      randomWordsInfo={randomWordsInfo}
      selectedCompletedPairId={selectedCompletedPairId}
      isGameCompleted={completedPairIds.length * 2 === randomWordsInfo.length}
      isResultReady={isResultReady}
      score={score}
      handleClick={handleClick}
      handleReplay={handleReplay}
    />
  );
}

GameContainer.propTypes = {
  gameLevel: PropTypes.shape({
    levelId: PropTypes.number,
    wordTranslations: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default withReceivedGameLevel(GameContainer);
