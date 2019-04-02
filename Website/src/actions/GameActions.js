import gameConstants from '../constants/gameConstants';

const initializeGamesInfo = gamesInfo => ({
    type: gameConstants.GAMES_INFO_INITIALIZATION,
    gamesInfo: gamesInfo
});

const updateGamesInfoAfterAddition = gamesInfo => ({
    type: gameConstants.GAMES_INFO_UPDATE_AFTER_ADDITION,
    gamesInfo: gamesInfo
});

const updateGamesInfoAfterDeletion = gameId => ({
    type: gameConstants.GAMES_INFO_UPDATE_AFTER_DELETION,
    gameId: gameId
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

const clearGameLevel = () => ({
    type: gameConstants.GAME_LEVEL_CLEARING
});

const gameActions = {
    initializeGamesInfo,
    updateGamesInfoAfterAddition,
    updateGamesInfoAfterDeletion,
    initializeGameInfo,
    clearGameInfo,
    initializeGameLevel,
    clearGameLevel
};

export default gameActions;
