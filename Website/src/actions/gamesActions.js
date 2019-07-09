import gamesConstants from '../constants/gamesConstants';

const initializeGamesInfo = gamesInfo => ({
    type: gamesConstants.INITIALIZE_GAMES_INFO,
    payload: gamesInfo
});

const initializeGameInfo = gameInfo => ({
    type: gamesConstants.INITIALIZE_GAME_INFO,
    payload: gameInfo
});

const updateGameInfo = gameInfo => ({
    type: gamesConstants.UPDATE_GAME_INFO,
    payload: gameInfo
});

const initializeGameLevel = gameLevel => ({
    type: gamesConstants.INITIALIZE_GAME_LEVEL,
    payload: gameLevel
});

export default {
    initializeGamesInfo,
    initializeGameInfo,
    updateGameInfo,
    initializeGameLevel
};
