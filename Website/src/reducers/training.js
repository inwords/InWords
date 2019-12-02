import { combineReducers } from 'redux';
import {
  INITIALIZE_TRAINING_CATEGORIES,
  INITIALIZE_TRAINING_CATEGORY,
  UPDATE_LEVEL_RESULT,
  INITIALIZE_TRAINING_LEVEL,
  INITIALIZE_TRAINING_HISTORY,
  INITIALIZE_TRAINING_WORD_PAIRS
} from 'src/actions/trainingActions';

function trainingCategories(state = [], action) {
  switch (action.type) {
    case INITIALIZE_TRAINING_CATEGORIES:
      return action.payload || [];
    default:
      return state;
  }
}

function trainingCategory(
  state = {
    trainingId: null,
    levelsInfo: []
  },
  action
) {
  switch (action.type) {
    case INITIALIZE_TRAINING_CATEGORY:
      return {
        trainingId: action.payload.gameId,
        levelsInfo: action.payload.levelInfos || []
      };
    case UPDATE_LEVEL_RESULT:
      return {
        ...state,
        levelsInfo: state.levelsInfo.map(levelInfo => {
          if (levelInfo.levelId !== action.payload.levelId) {
            return levelInfo;
          }

          return {
            ...levelInfo,
            playerStars: Math.max(levelInfo.playerStars, action.payload.score)
          };
        })
      };
    default:
      return state;
  }
}

function trainingLevel(
  state = {
    levelId: null,
    wordTranslations: []
  },
  action
) {
  switch (action.type) {
    case INITIALIZE_TRAINING_LEVEL:
      return {
        levelId: action.payload.levelId,
        wordTranslations: action.payload.wordTranslations || []
      };
    default:
      return state;
  }
}

function trainingHistory(
  state = {
    actual: false,
    recentTrainings: []
  },
  action
) {
  switch (action.type) {
    case INITIALIZE_TRAINING_HISTORY:
      return {
        actual: true,
        recentTrainings: action.payload || []
      };
    default:
      return state;
  }
}

function trainingWordPairs(
  state = {
    actual: false,
    wordPairs: []
  },
  action
) {
  switch (action.type) {
    case INITIALIZE_TRAINING_WORD_PAIRS:
      return {
        actual: true,
        wordPairs: action.payload || []
      };
    default:
      return state;
  }
}

export default combineReducers({
  trainingCategories,
  trainingCategory,
  trainingLevel,
  trainingHistory,
  trainingWordPairs
});
