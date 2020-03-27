import { combineReducers } from 'redux';
import {
  INITIALIZE_WORD_SETS,
  INITIALIZE_WORD_SET,
  UPDATE_WORD_SET
} from 'src/actions/wordSetActions';

const sets = (state = [], action) => {
  switch (action.type) {
    case INITIALIZE_WORD_SETS:
      return action.payload.wordSets || [];
    default:
      return state;
  }
};

const wordPairsMap = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_WORD_SET: {
      const payload = action.payload;

      return {
        ...state,
        [payload.wordSetId]: payload.wordSet.words.map(wordPair => {
          const convertedWordPair = {
            ...wordPair,
            serverId: wordPair.wordPairId
          };
          delete convertedWordPair.wordPairId;

          return convertedWordPair;
        })
      };
    }
    case UPDATE_WORD_SET:
      {
        const payload = action.payload;

        if (state[payload.wordSetId]) {
          const wordSet = state[payload.wordSetId];

          return {
            ...state,
            [payload.wordSetId]: wordSet.map(wordPair => {
              if (
                payload.wordPairs.find(
                  ({ serverId }) => serverId === wordPair.serverId
                )
              ) {
                return {
                  ...wordPair,
                  hasAdded: true
                };
              }

              return wordPair;
            })
          };
        }
      }

      return state;
    default:
      return state;
  }
};

export default combineReducers({
  sets,
  wordPairsMap
});
