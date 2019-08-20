import {
  INITIALIZE_WORD_PAIRS,
  UPDATE_WORD_PAIRS_AFTER_DELETION,
  UPDATE_WORD_PAIRS_AFTER_ADDITION,
  UPDATE_WORD_PAIRS_AFTER_EDITING
} from 'actions/wordPairsActions';

const lexicographicalComparison = (firstWordPair, secondWordPair) =>
  firstWordPair.wordForeign.localeCompare(secondWordPair.wordForeign);

export default function wordPairs(state = [], action) {
  switch (action.type) {
    case INITIALIZE_WORD_PAIRS:
      return action.payload.addedWords.sort(lexicographicalComparison) || [];
    case UPDATE_WORD_PAIRS_AFTER_DELETION:
      return state.filter(
        wordPair => !action.payload.includes(wordPair.serverId)
      );
    case UPDATE_WORD_PAIRS_AFTER_ADDITION:
      if (
        state.find(wordPair => wordPair.serverId === action.payload.serverId)
      ) {
        return state;
      }
      return state.concat(action.payload).sort(lexicographicalComparison);
    case UPDATE_WORD_PAIRS_AFTER_EDITING:
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
        .map(wordPair =>
          wordPair.serverId === action.payload.pairId
            ? action.payload.wordPair
            : wordPair
        )
        .sort(lexicographicalComparison);
    default:
      return state;
  }
}
