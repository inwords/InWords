import { combineReducers } from 'redux';
import {
  INITIALIZE_WORD_SETS,
  INITIALIZE_WORD_SET_LEVELS,
  UPDATE_WORD_SET_LEVEL_RESULT,
  INITIALIZE_WORD_SET_LEVEL,
  REMOVE_WORD_SET_LEVEL_PAIRS,
  INITIALIZE_WORD_SET_PAIRS,
  UPDATE_WORD_SET_PAIRS
} from 'src/actions/wordSetActions';

export const all = (state = [], action) => {
  switch (action.type) {
    case INITIALIZE_WORD_SETS:
      return action.payload.wordSets || [];
    default:
      return state;
  }
};

export const levelsListsMap = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_WORD_SET_LEVELS: {
      const payload = action.payload;

      return {
        ...state,
        [payload.wordSetId]: payload.levels || []
      };
    }
    case UPDATE_WORD_SET_LEVEL_RESULT:
      {
        const payload = action.payload;

        if (state[payload.wordSetId]) {
          const levels = state[payload.wordSetId] || [];

          return {
            ...state,
            [payload.wordSetId]: levels.map(level => {
              const levelResult = payload.levelResult.classicCardLevelResult[0];

              if (level.levelId !== levelResult.levelId) {
                return level;
              }

              return {
                ...level,
                stars: Math.max(level.stars, levelResult.score)
              };
            })
          };
        }
      }

      return state;
    default:
      return state;
  }
};

export const levelsMap = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_WORD_SET_LEVEL: {
      const payload = action.payload;

      return {
        ...state,
        [payload.levelId]: payload
      };
    }
    case REMOVE_WORD_SET_LEVEL_PAIRS: {
      const payload = action.payload;

      return {
        ...state,
        [payload.levelId]: {
          ...state[payload.levelId],
          wordTranslations: state[payload.levelId].wordTranslations.filter(
            ({ serverId }) => !payload.pairIds.includes(serverId)
          )
        }
      };
    }
    default:
      return state;
  }
};

export const pairsListsMap = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_WORD_SET_PAIRS: {
      const payload = action.payload;

      return {
        ...state,
        [payload.wordSetId]: payload.wordPairs.map(wordPair => ({
          ...wordPair,
          serverId: wordPair.wordPairId
        }))
      };
    }
    case UPDATE_WORD_SET_PAIRS:
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
  all,
  levelsListsMap,
  levelsMap,
  pairsListsMap
});
