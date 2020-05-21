import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import flatMap from 'src/utils/flatMap';
import shuffle from 'src/utils/shuffle';

const useCardsGame = (wordTranslations, { sameLang }) => {
  const [wordPairs, setWordPairs] = useState([]);
  const [selectedWordPairs, setSelectedWordPairs] = useState([]);
  const [rightSelectedPairId, setRightSelectedPairId] = useState(-1);
  const [completedPairIdsMap, setCompletedPairIdsMap] = useState({});
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const preparedWordPairs = flatMap(wordTranslations, wordPair => [
      {
        id: uuidv4(),
        pairId: wordPair.serverId,
        word: wordPair.wordForeign,
        onSpeech: wordPair.onSpeech
      },
      {
        id: uuidv4(),
        pairId: wordPair.serverId,
        word: sameLang ? wordPair.wordForeign : wordPair.wordNative,
        onSpeech: null
      }
    ]);

    setWordPairs(shuffle(preparedWordPairs));
  }, [wordTranslations, sameLang]);

  const isGameCompleted = newCompletedPairIdsMap => {
    const numberOfCompletedPairs = Object.keys(newCompletedPairIdsMap).length;
    return (
      numberOfCompletedPairs === wordPairs.length / 2 &&
      numberOfCompletedPairs > 0
    );
  };

  return {
    wordPairs,
    selectedWordPairs,
    setSelectedWordPairs,
    rightSelectedPairId,
    setRightSelectedPairId,
    completedPairIdsMap,
    setCompletedPairIdsMap,
    metrics,
    setMetrics,
    isGameCompleted
  };
};

export default useCardsGame;
