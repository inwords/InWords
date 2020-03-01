import { combineReducers } from 'redux';
import {
  INITIALIZE_TRAINING_CATEGORIES,
  INITIALIZE_TRAINING_CATEGORY,
  UPDATE_LEVEL_RESULT,
  INITIALIZE_TRAINING_LEVEL,
  REMOVE_TRAINING_LEVEL_WORD_PAIRS,
  INITIALIZE_TRAINING_HISTORY
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
          if (
            levelInfo.levelId !==
            action.payload.classicCardLevelResult[0].levelId
          ) {
            return levelInfo;
          }

          return {
            ...levelInfo,
            playerStars: Math.max(
              levelInfo.playerStars,
              action.payload.classicCardLevelResult[0].score
            )
          };
        })
      };
    default:
      return state;
  }
}

function trainingLevelsMap(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_TRAINING_LEVEL:
      return {
        ...state,
        [action.payload.levelId]: action.payload
      };
    case REMOVE_TRAINING_LEVEL_WORD_PAIRS:
      return {
        ...state,
        [action.payload.levelId]: {
          ...state[action.payload.levelId],
          wordTranslations: state[
            action.payload.levelId
          ].wordTranslations.filter(
            ({ serverId }) => !action.payload.pairIds.includes(serverId)
          )
        }
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
        recentTrainings: (action.payload || []).slice(0, 30)
      };
    default:
      return state;
  }
}

export default combineReducers({
  trainingCategories,
  trainingCategory,
  trainingLevelsMap,
  trainingHistory
});
