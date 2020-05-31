const convertWordSetLevelPairs = wordPairs =>
  wordPairs.map(wordPair => {
    const convertedWordPair = {
      serverId: wordPair.userWordPairId,
      wordForeign: wordPair.foreignWord,
      wordNative: wordPair.nativeWord
    };
    delete convertedWordPair.userWordPairId;
    delete convertedWordPair.foreignWord;
    delete convertedWordPair.nativeWord;

    return convertedWordPair;
  });

export default convertWordSetLevelPairs;
