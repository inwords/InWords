import { combineReducers } from 'redux';
import {
  INITIALIZE_COURSES,
  INITIALIZE_COURSE,
  UPDATE_LEVEL_RESULT,
  INITIALIZE_LEVEL,
  REMOVE_LEVEL_WORD_PAIRS,
  INITIALIZE_HISTORY
} from 'src/actions/trainingActions';

function courses(state = [], action) {
  switch (action.type) {
    case INITIALIZE_COURSES:
      return action.payload || [];
    default:
      return state;
  }
}

function course(
  state = {
    trainingId: null,
    levelsInfo: []
  },
  action
) {
  switch (action.type) {
    case INITIALIZE_COURSE:
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

function levelsMap(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_LEVEL:
      return {
        ...state,
        [action.payload.levelId]: action.payload
      };
    case REMOVE_LEVEL_WORD_PAIRS:
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

function history(
  state = {
    actual: false,
    recentTrainings: []
  },
  action
) {
  switch (action.type) {
    case INITIALIZE_HISTORY:
      return {
        actual: true,
        recentTrainings: (action.payload || []).slice(0, 30).reverse()
      };
    default:
      return state;
  }
}

export default combineReducers({
  courses,
  course,
  levelsMap,
  history
});
