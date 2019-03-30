import { gameActions } from './gameActions';
import { apiAction } from './apiAction';

function pullGamesInfo() {
    return apiAction({
        endpoint: 'Game/GameInfo',
        onSuccess: [gameActions.gamesInfoReceived],
        errorMessage: 'Ошибка загрузки игр'
    });
}

function pullGameInfo(gameId) {
    return apiAction({
        endpoint: `Game/${gameId}`,
        onSuccess: [gameActions.gameInfoReceived],
        errorMessage: 'Ошибка загрузки уровней'
    });
}

function pullGameLevel(levelId) {
    return apiAction({
        endpoint: `Game/Level/${levelId}`,
        onSuccess: [gameActions.gameLevelReceived],
        errorMessage: 'Ошибка загрузки уровня'
    });
}

function addGamePack(gamePack) {
    return apiAction({
        endpoint: 'Game/AddGamePack',
        method: 'POST',
        data: JSON.stringify(gamePack),
        onSuccess: [(data) => gameActions.gamesInfoAddLocalRefresh({
            gameId: data.serverId,
            isAvailable: true,
            title: gamePack.CreationInfo.Descriptions[0].Title
        })],
        errorMessage: 'Ошибка добавления игры'
    });
}

function delGamePack(gameId) {
    return apiAction({
        endpoint: `Game/Delete/${gameId}`,
        method: 'DELETE',
        onSuccess: [() => gameActions.gamesInfoDelLocalRefresh(gameId)],
        errorMessage: 'Ошибка удаления игры'
    });
}

function resetGameInfo() {
    return (dispatch) => {
        dispatch(gameActions.gameInfoReset());
    }
}

function resetGameLevel() {
    return (dispatch) => {
        dispatch(gameActions.gameLevelReset());
    }
}

export const gameApiActions = {
    pullGamesInfo,
    pullGameInfo,
    pullGameLevel,
    resetGameInfo,
    resetGameLevel,
    addGamePack,
    delGamePack
};
