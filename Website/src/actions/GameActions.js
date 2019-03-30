import { gameConstants } from '../constants/gameConstants';

const gamesInfoReceived = gamesInfo => ({
    type: gameConstants.GAMES_INFO_RECEIVED,
    gamesInfo: gamesInfo
});

const gamesInfoAddLocalRefresh = gamesInfo => ({
    type: gameConstants.GAMES_INFO_ADD_LOCAL_REFRESH,
    gamesInfo: gamesInfo
});

const gamesInfoDelLocalRefresh = gameId => ({
    type: gameConstants.GAMES_INFO_DEL_LOCAL_REFRESH,
    gameId: gameId
});

const gameInfoReceived = gameInfo => ({
    type: gameConstants.GAME_INFO_RECEIVED,
    gameInfo: gameInfo
});

const gameInfoReset = () => ({
    type: gameConstants.GAME_INFO_RESET
});

const gameLevelReceived = gameLevel => ({
    type: gameConstants.GAME_LEVEL_RECEIVED,
    gameLevel: gameLevel
});

const gameLevelReset = () => ({
    type: gameConstants.GAME_LEVEL_RESET
});

export const gameActions = {
    gamesInfoReceived,
    gamesInfoAddLocalRefresh,
    gamesInfoDelLocalRefresh,
    gameInfoReceived,
    gameInfoReset,
    gameLevelReceived,
    gameLevelReset
};
