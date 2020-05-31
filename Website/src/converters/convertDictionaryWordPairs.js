const convertDictionaryWordPairs = wordPairs =>
  wordPairs.map(wordPair => {
    const convertedWordPair = {
      ...wordPair,
      serverId: wordPair.userWordPair
    };
    delete convertedWordPair.userWordPair;

    return convertedWordPair;
  });

export default convertDictionaryWordPairs;
