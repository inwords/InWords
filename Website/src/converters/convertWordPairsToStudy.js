const convertWordPairsToStudy = wordPairs =>
  wordPairs.map(wordPair => {
    const convertedWordPair = {
      serverId: wordPair.userWordPair,
      wordForeign: wordPair.foreignWord,
      wordNative: wordPair.nativeWord
    };
    delete convertedWordPair.userWordPairId;
    delete convertedWordPair.foreignWord;
    delete convertedWordPair.nativeWord;

    return convertedWordPair;
  });

export default convertWordPairsToStudy;
