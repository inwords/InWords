import * as gamesConstants from 'constants/gamesConstants';

export const initializeGamesInfo = gamesInfo => ({
  type: gamesConstants.INITIALIZE_GAMES_INFO,
  payload: gamesInfo,
});

export const initializeGameInfo = gameInfo => ({
  type: gamesConstants.INITIALIZE_GAME_INFO,
  payload: gameInfo,
});

export const updateGameInfo = gameInfo => ({
  type: gamesConstants.UPDATE_GAME_INFO,
  payload: gameInfo,
});

export const initializeGameLevel = gameLevel => ({
  type: gamesConstants.INITIALIZE_GAME_LEVEL,
  payload: gameLevel,
});
