import {
  SYNC_WORD_PAIRS,
  DELETE_WORD_PAIRS,
  ADD_WORD_PAIRS,
  EDIT_WORD_PAIRS
} from 'src/actions/dictionaryActions';

const lexicographicalComparison = (firstWordPair, secondWordPair) =>
  firstWordPair.wordForeign.localeCompare(secondWordPair.wordForeign);

export default function dictionary(
  state = {
    actual: false,
    wordPairs: []
  },
  action
) {
  switch (action.type) {
    case SYNC_WORD_PAIRS:
      return {
        actual: true,
        wordPairs: state.wordPairs
          .filter(
            ({ serverId }) =>
              !action.payload.removedServerIds.includes(serverId)
          )
          .concat(action.payload.addedWords.sort(lexicographicalComparison))
      };
    case DELETE_WORD_PAIRS:
      return {
        ...state,
        wordPairs: state.wordPairs.filter(
          ({ serverId }) => !action.payload.includes(serverId)
        )
      };
    case ADD_WORD_PAIRS: {
      const wordPairs = state.wordPairs.concat(action.payload);

      const wordPairsMap = {};
      wordPairs.forEach(wordPair => {
        wordPairsMap[wordPair.serverId] = wordPair;
      });

      return {
        ...state,
        wordPairs: Object.values(wordPairsMap).sort(lexicographicalComparison)
      };
    }
    case EDIT_WORD_PAIRS: {
      const wordPairs = state.wordPairs.map(wordPair => {
        const foundEditedWordPair = action.payload.find(
          ({ oldServerId }) => oldServerId === wordPair.serverId
        );
        return foundEditedWordPair ? foundEditedWordPair : wordPair;
      });

      const wordPairsMap = {};
      wordPairs.forEach(wordPair => {
        wordPairsMap[wordPair.serverId] = wordPair;
      });

      return {
        ...state,
        wordPairs: Object.values(wordPairsMap).sort(lexicographicalComparison)
      };
    }
    default:
      return state;
  }
}
