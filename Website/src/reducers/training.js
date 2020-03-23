import { combineReducers } from 'redux';
import {
  INITIALIZE_COURSES,
  INITIALIZE_WORD_SET,
  UPDATE_WORD_SET,
  INITIALIZE_COURSE,
  UPDATE_LEVEL_RESULT,
  INITIALIZE_LEVEL,
  REMOVE_LEVEL_WORD_PAIRS,
  INITIALIZE_HISTORY
} from 'src/actions/trainingActions';

const courses = (state = [], action) => {
  switch (action.type) {
    case INITIALIZE_COURSES:
      return action.payload || [];
    default:
      return state;
  }
};

const wordSetsMap = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_WORD_SET: {
      const payload = action.payload;

      return {
        ...state,
        [payload.courseId]: payload.wordSet.words.map(wordPair => {
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

        if (state[payload.courseId]) {
          const wordSet = state[payload.courseId];

          return {
            ...state,
            [payload.courseId]: wordSet.map(wordPair => {
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

const coursesMap = (
  state = {
    courseId: null,
    levelsInfo: []
  },
  action
) => {
  switch (action.type) {
    case INITIALIZE_COURSE: {
      const payload = action.payload;

      return {
        ...state,
        [payload.gameId]: {
          courseId: payload.gameId,
          levelsInfo: payload.levelInfos || []
        }
      };
    }
    case UPDATE_LEVEL_RESULT:
      {
        const payload = action.payload;

        if (state[payload.courseId]) {
          const course = state[payload.courseId];

          return {
            ...state,
            [payload.courseId]: {
              levelsInfo: course.levelsInfo.map(levelInfo => {
                const levelResult =
                  payload.levelResult.classicCardLevelResult[0];

                if (levelInfo.levelId !== levelResult.levelId) {
                  return levelInfo;
                }

                return {
                  ...levelInfo,
                  playerStars: Math.max(
                    levelInfo.playerStars,
                    levelResult.score
                  )
                };
              })
            }
          };
        }
      }

      return state;
    default:
      return state;
  }
};

const levelsMap = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_LEVEL: {
      const payload = action.payload;

      return {
        ...state,
        [payload.levelId]: payload
      };
    }
    case REMOVE_LEVEL_WORD_PAIRS: {
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

const history = (
  state = {
    actual: false,
    recentTrainings: []
  },
  action
) => {
  switch (action.type) {
    case INITIALIZE_HISTORY:
      return {
        actual: true,
        recentTrainings: (action.payload || []).slice(0, 30).reverse()
      };
    default:
      return state;
  }
};

export default combineReducers({
  courses,
  wordSetsMap,
  coursesMap,
  levelsMap,
  history
});
