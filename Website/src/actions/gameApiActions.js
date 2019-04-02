import gameActions from './gameActions';
import apiAction from './apiAction';

function pullGamesInfo() {
    return apiAction({
        endpoint: 'Game/GameInfo',
        actionsOnSuccess: [gameActions.initializeGamesInfo],
        errorMessage: 'Ошибка загрузки игр'
    });
}

function pullGameInfo(gameId) {
    return apiAction({
        endpoint: `Game/${gameId}`,
        actionsOnSuccess: [gameActions.initializeGameInfo],
        errorMessage: 'Ошибка загрузки уровней'
    });
}

function pullGameLevel(levelId) {
    return apiAction({
        endpoint: `Game/Level/${levelId}`,
        actionsOnSuccess: [gameActions.initializeGameLevel],
        errorMessage: 'Ошибка загрузки уровня'
    });
}

function addGamePack(gamePack) {
    return apiAction({
        endpoint: 'Game/AddGamePack',
        method: 'POST',
        data: JSON.stringify(gamePack),
        actionsOnSuccess: [(data) => gameActions.updateGamesInfoAfterAddition({
            gameId: data.serverId,
            isAvailable: true,
            title: gamePack.CreationInfo.Descriptions[0].Title
        })],
        errorMessage: 'Ошибка добавления игры'
    });
}

function deleteGamePack(gameId) {
    return apiAction({
        endpoint: `Game/Delete/${gameId}`,
        method: 'DELETE',
        actionsOnSuccess: [() => gameActions.updateGamesInfoAfterDeletion(gameId)],
        errorMessage: 'Ошибка удаления игры'
    });
}

function resetGameInfo() {
    return (dispatch) => {
        dispatch(gameActions.clearGameInfo());
    }
}

function resetGameLevel() {
    return (dispatch) => {
        dispatch(gameActions.clearGameLevel());
    }
}

const gameApiActions = {
    pullGamesInfo,
    pullGameInfo,
    pullGameLevel,
    resetGameInfo,
    resetGameLevel,
    addGamePack,
    deleteGamePack
};

export default gameApiActions;
