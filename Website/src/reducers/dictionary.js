import {
  INITIALIZE_WORD_PAIRS,
  UPDATE_WORD_PAIRS_AFTER_DELETION,
  UPDATE_WORD_PAIRS_AFTER_ADDITION,
  UPDATE_WORD_PAIRS_AFTER_EDITING
} from 'src/actions/dictionaryActions';

const lexicographicalComparison = (firstWordPair, secondWordPair) =>
  firstWordPair.wordForeign.localeCompare(secondWordPair.wordForeign);

const trimWordPair = wordPair => ({
  ...wordPair,
  wordForeign: wordPair.wordForeign.trim(),
  wordNative: wordPair.wordNative.trim()
});

export default function wordPairs(
  state = {
    actual: false,
    wordPairs: []
  },
  action
) {
  switch (action.type) {
    case INITIALIZE_WORD_PAIRS:
      return {
        actual: true,
        wordPairs: state.wordPairs
          .concat(
            action.payload.addedWords
              .map(wordPair => trimWordPair(wordPair))
              .sort(lexicographicalComparison)
          )
          .filter(
            ({ serverId }) =>
              !action.payload.removedServerIds.includes(serverId)
          )
      };
    case UPDATE_WORD_PAIRS_AFTER_DELETION:
      return {
        ...state,
        wordPairs: state.wordPairs.filter(
          ({ serverId }) => !action.payload.includes(serverId)
        )
      };
    case UPDATE_WORD_PAIRS_AFTER_ADDITION:
      return {
        ...state,
        wordPairs: state.wordPairs
          .concat(
            action.payload
              .filter(
                ({ serverId }) =>
                  !state.wordPairs.find(
                    wordPair => wordPair.serverId === serverId
                  )
              )
              .map(wordPair => trimWordPair(wordPair))
          )
          .sort(lexicographicalComparison)
      };
    case UPDATE_WORD_PAIRS_AFTER_EDITING:
      if (
        state.wordPairs.find(
          ({ serverId }) => serverId === action.payload.wordPair.serverId
        )
      ) {
        return {
          ...state,
          wordPairs: state.wordPairs.filter(
            ({ serverId }) => serverId !== action.payload.pairId
          )
        };
      }
      return {
        ...state,
        wordPairs: state.wordPairs
          .map(wordPair =>
            wordPair.serverId === action.payload.pairId
              ? action.payload.wordPair
              : wordPair
          )
          .sort(lexicographicalComparison)
      };
    default:
      return state;
  }
}
