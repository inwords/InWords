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
  const [completedPairIds, setCompletedPairIds] = useState([]);
  const [selectedCompletedPairId, setSelectedCompletedPairId] = useState(-1);
  const [openingQuantity, setOpeningQuantity] = useState(0);
  const [isGameCompleted, setIsGameCompleted] = React.useState(false);
  const [isResultReady, setIsResultReady] = React.useState(false);
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
          word: wordPair.wordForeign,
          isCompleted: false,
          isSelected: false
        },
        {
          id: index * 2 + 1,
          pairId: wordPair.serverId,
          word: wordPair.wordNative,
          isCompleted: false,
          isSelected: false
        }
      ])
    );

    setRandomWordsInfo(shuffle(wordsInfo));
  }, [wordTranslations]);

  useEffect(() => {
    if (
      completedPairIds.length > 0 &&
      completedPairIds.length === randomWordsInfo.length / 2
    ) {
      setTimeout(() => {
        setIsGameCompleted(true);
      }, 700);

      setTimeout(() => {
        setIsResultReady(true);
      }, 1200);

      const saveLevelResult = (levelResult, actionOnSuccess) => {
        dispatch(saveLevelResultAction(levelResult, actionOnSuccess));
      };

      saveLevelResult(
        {
          levelId: levelId,
          openingQuantity: openingQuantity,
          wordsCount: randomWordsInfo.length
        },
        data => {
          setScore(data.score);
        }
      );
    }
  }, [
    completedPairIds.length,
    randomWordsInfo.length,
    levelId,
    openingQuantity,
    dispatch
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
          pairId: pairId
        }
      ]);

      setRandomWordsInfo(
        randomWordsInfo.map(randomWordInfo => {
          if (randomWordInfo.id === wordId) {
            return {
              ...randomWordInfo,
              isSelected: true
            };
          }

          return randomWordInfo;
        })
      );

      setOpeningQuantity(openingQuantity + 1);
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
                isCompleted: true
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
                randomWordInfo.pairId === selectedWordsInfo[0].pairId ||
                randomWordInfo.pairId === pairId
              ) {
                return {
                  ...randomWordInfo,
                  isSelected: false
                };
              }

              return randomWordInfo;
            })
          );
        }, 700);
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
    setCompletedPairIds([]);
    setSelectedCompletedPairId(-1);
    setOpeningQuantity(0);
    setIsGameCompleted(false);
    setIsResultReady(false);
    setScore(null);
  };

  return (
    <GameCore
      randomWordsInfo={randomWordsInfo}
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
