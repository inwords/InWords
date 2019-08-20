export const INITIALIZE_GAMES_INFO = 'INITIALIZE_GAMES_INFO';
export const initializeGamesInfo = gamesInfo => ({
  type: INITIALIZE_GAMES_INFO,
  payload: gamesInfo
});

export const INITIALIZE_GAME_INFO = 'INITIALIZE_GAME_INFO';
export const initializeGameInfo = gameInfo => ({
  type: INITIALIZE_GAME_INFO,
  payload: gameInfo
});

export const UPDATE_GAME_INFO = 'UPDATE_GAME_INFO';
export const updateGameInfo = gameInfo => ({
  type: UPDATE_GAME_INFO,
  payload: gameInfo
});

export const INITIALIZE_GAME_LEVEL = 'INITIALIZE_GAME_LEVEL';
export const initializeGameLevel = gameLevel => ({
  type: INITIALIZE_GAME_LEVEL,
  payload: gameLevel
});
