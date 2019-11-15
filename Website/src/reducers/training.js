import { combineReducers } from 'redux';
import {
  INITIALIZE_TRAINING_CATEGORIES,
  INITIALIZE_TRAINING_CATEGORY_INFO,
  UPDATE_TRAINING_CATEGORY_LEVEL_RESULT,
  INITIALIZE_TRAINING_LEVEL
} from 'src/actions/trainingActions';

function trainingCategories(state = [], action) {
  switch (action.type) {
    case INITIALIZE_TRAINING_CATEGORIES:
      return action.payload || [];
    default:
      return state;
  }
}

const initialTrainingCategoryInfoState = {
  trainingId: null,
  levelsInfo: []
};

function trainingCategoryInfo(state = initialTrainingCategoryInfoState, action) {
  switch (action.type) {
    case INITIALIZE_TRAINING_CATEGORY_INFO:
      return {
        trainingId: action.payload.gameId,
        levelsInfo: action.payload.levelInfos || []
      };
    case UPDATE_TRAINING_CATEGORY_LEVEL_RESULT:
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

const initialTrainingLevelState = {
  levelId: null,
  wordTranslations: []
};

function trainingLevel(state = initialTrainingLevelState, action) {
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

export default combineReducers({
  trainingCategories,
  trainingCategoryInfo,
  trainingLevel
});
