import gameConstants from '../constants/gameConstants';

const initializeGamesInfo = gamesInfo => ({
    type: gameConstants.GAMES_INFO_INITIALIZATION,
    gamesInfo: gamesInfo
});

const initializeGameInfo = gameInfo => ({
    type: gameConstants.GAME_INFO_INITIALIZATION,
    gameInfo: gameInfo
});

const clearGameInfo = () => ({
    type: gameConstants.GAME_INFO_CLEARING
});

const initializeGameLevel = gameLevel => ({
    type: gameConstants.GAME_LEVEL_INITIALIZATION,
    gameLevel: gameLevel
});

const updateGameLevel = levelResult => ({
    type: gameConstants.GAME_LEVEL_UPDATE,
    payload: levelResult
});

const clearGameLevel = () => ({
    type: gameConstants.GAME_LEVEL_CLEARING
});

const gameActions = {
    initializeGamesInfo,
    initializeGameInfo,
    clearGameInfo,
    initializeGameLevel,
    updateGameLevel,
    clearGameLevel
};

export default gameActions;
