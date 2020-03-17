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
    case INITIALIZE_WORD_SET:
      return {
        ...state,
        [action.payload.courseId]: action.payload.wordSet.words.map(
          wordPair => {
            const convertedWordPair = {
              ...wordPair,
              serverId: wordPair.wordPairId
            };
            delete convertedWordPair.wordPairId;

            return convertedWordPair;
          }
        )
      };
    case UPDATE_WORD_SET:
      if (state[action.payload.courseId]) {
        const wordSet = state[action.payload.courseId];

        return {
          ...state,
          [action.payload.courseId]: wordSet.map(wordPair => {
            if (
              action.payload.wordPairs.find(
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

      return state;
    default:
      return state;
  }
};

const coursesMap = (
  state = {
    trainingId: null,
    levelsInfo: []
  },
  action
) => {
  switch (action.type) {
    case INITIALIZE_COURSE:
      return {
        ...state,
        [action.payload.gameId]: {
          trainingId: action.payload.gameId,
          levelsInfo: action.payload.levelInfos || []
        }
      };
    case UPDATE_LEVEL_RESULT:
      if (state[action.payload.courseId]) {
        const course = state[action.payload.courseId];

        return {
          ...state,
          [action.payload.courseId]: {
            levelsInfo: course.levelsInfo.map(levelInfo => {
              const levelResult =
                action.payload.levelResult.classicCardLevelResult[0];

              if (levelInfo.levelId !== levelResult.levelId) {
                return levelInfo;
              }

              return {
                ...levelInfo,
                playerStars: Math.max(levelInfo.playerStars, levelResult.score)
              };
            })
          }
        };
      }

      return state;
    default:
      return state;
  }
};

const levelsMap = (state = {}, action) => {
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
