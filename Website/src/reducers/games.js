import { combineReducers } from 'redux';
import * as gamesConstants from 'constants/gamesConstants';

const gamesInfo = (state = [], action) => {
  switch (action.type) {
    case gamesConstants.INITIALIZE_GAMES_INFO:
      return action.payload || [];
    default:
      return state;
  }
};

const initialGameInfoState = {
  gameId: null,
  levelsInfo: []
};

const gameInfo = (state = initialGameInfoState, action) => {
  switch (action.type) {
    case gamesConstants.INITIALIZE_GAME_INFO:
      return {
        gameId: action.payload.gameId || initialGameInfoState.gameId,
        levelsInfo: action.payload.levelInfos || initialGameInfoState.levelsInfo
      };
    case gamesConstants.UPDATE_GAME_INFO:
      return {
        ...state,
        levelsInfo: state.levelsInfo.map(levelInfo => {
          return levelInfo.levelId !== action.payload.levelId
            ? levelInfo
            : {
                ...levelInfo,
                playerStars: action.payload.score
              };
        })
      };
    default:
      return state;
  }
};

const initialGameLevelState = {
  levelId: null,
  wordTranslations: []
};

const gameLevel = (state = initialGameLevelState, action) => {
  switch (action.type) {
    case gamesConstants.INITIALIZE_GAME_LEVEL:
      return {
        levelId: action.payload.levelId || initialGameLevelState.levelId,
        wordTranslations:
          action.payload.wordTranslations ||
          initialGameLevelState.wordTranslations
      };
    default:
      return state;
  }
};

const games = combineReducers({
  gamesInfo,
  gameInfo,
  gameLevel
});

export default games;
