import * as wordPairsConstants from 'constants/wordPairsConstants';

const lexicographicalComparison = (firstWordPair, secondWordPair) =>
  firstWordPair.wordForeign.localeCompare(secondWordPair.wordForeign);

const wordPairs = (state = [], action) => {
  switch (action.type) {
    case wordPairsConstants.INITIALIZE_WORD_PAIRS:
      return action.payload.addedWords.sort(lexicographicalComparison) || [];
    case wordPairsConstants.UPDATE_WORD_PAIRS_AFTER_DELETION:
      return state.filter(
        wordPair => !action.payload.includes(wordPair.serverId)
      );
    case wordPairsConstants.UPDATE_WORD_PAIRS_AFTER_ADDITION:
      if (
        state.find(wordPair => wordPair.serverId === action.payload.serverId)
      ) {
        return state;
      }
      return state.concat(action.payload).sort(lexicographicalComparison);
    case wordPairsConstants.UPDATE_WORD_PAIRS_AFTER_EDITING:
      if (
        state.find(
          wordPair => wordPair.serverId === action.payload.wordPair.serverId
        )
      ) {
        return state.filter(
          wordPair => wordPair.serverId !== action.payload.pairId
        );
      }
      return state
        .map(wordPair => {
          return wordPair.serverId === action.payload.pairId
            ? action.payload.wordPair
            : wordPair;
        })
        .sort(lexicographicalComparison);
    default:
      return state;
  }
};

export default wordPairs;
