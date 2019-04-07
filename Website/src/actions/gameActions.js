import gameConstants from '../constants/gameConstants';

const initializeGamesInfo = gamesInfo => ({
    type: gameConstants.GAMES_INFO_INITIALIZATION,
    payload: gamesInfo
});

const initializeGameInfo = gameInfo => ({
    type: gameConstants.GAME_INFO_INITIALIZATION,
    payload: gameInfo
});

const clearGameInfo = () => ({
    type: gameConstants.GAME_INFO_CLEARING
});

const initializeGameLevel = gameLevel => ({
    type: gameConstants.GAME_LEVEL_INITIALIZATION,
    payload: gameLevel
});

const clearGameLevel = () => ({
    type: gameConstants.GAME_LEVEL_CLEARING
});

const gameActions = {
    initializeGamesInfo,
    initializeGameInfo,
    clearGameInfo,
    initializeGameLevel,
    clearGameLevel
};

export default gameActions;
