import { combineReducers } from 'redux';
import {
  INITIALIZE_GAMES_INFO,
  INITIALIZE_GAME_INFO,
  UPDATE_GAME_INFO,
  INITIALIZE_GAME_LEVEL
} from 'actions/gamesActions';

function gamesInfo(state = [], action) {
  switch (action.type) {
    case INITIALIZE_GAMES_INFO:
      return action.payload || [];
    default:
      return state;
  }
}

const initialGameInfoState = {
  gameId: null,
  levelsInfo: []
};

function gameInfo(state = initialGameInfoState, action) {
  switch (action.type) {
    case INITIALIZE_GAME_INFO:
      return {
        gameId: action.payload.gameId || initialGameInfoState.gameId,
        levelsInfo: action.payload.levelInfos || initialGameInfoState.levelsInfo
      };
    case UPDATE_GAME_INFO:
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

const initialGameLevelState = {
  levelId: null,
  wordTranslations: []
};

function gameLevel(state = initialGameLevelState, action) {
  switch (action.type) {
    case INITIALIZE_GAME_LEVEL:
      return {
        levelId: action.payload.levelId || initialGameLevelState.levelId,
        wordTranslations:
          action.payload.wordTranslations ||
          initialGameLevelState.wordTranslations
      };
    default:
      return state;
  }
}

export default combineReducers({
  gamesInfo,
  gameInfo,
  gameLevel
});
