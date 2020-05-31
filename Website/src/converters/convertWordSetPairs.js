const convertWordSetPairs = wordPairs =>
  wordPairs.map(wordPair => {
    const convertedWordPair = {
      ...wordPair,
      serverId: wordPair.wordPairId
    };
    delete convertedWordPair.wordPairId;

    return convertedWordPair;
  });

export default convertWordSetPairs;
