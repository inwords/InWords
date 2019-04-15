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
        errorMessage: 'Ошибка загрузки игры'
    });
}

function pullGameLevel(levelId) {
    return apiAction({
        endpoint: `Game/Level/${levelId}`,
        actionsOnSuccess: [gameActions.initializeGameLevel],
        errorMessage: 'Ошибка загрузки уровня'
    });
}

function saveLevelResult(levelResult) {
    return apiAction({
        endpoint: `Game/Score`,
        method: 'POST',
        data: JSON.stringify(levelResult),
        actionsOnSuccess: [
            gameActions.updateGameInfoAfterResultSaving,
            gameActions.updateGameLevelAfterResultSaving
        ],
        errorMessage: 'Ошибка сохранения результата'
    });
}

function addGamePack(gamePack) {
    return apiAction({
        endpoint: 'Game/AddGamePack',
        method: 'POST',
        data: JSON.stringify(gamePack),
        actionsOnSuccess: [data => gameActions.updateGamesInfoAfterAddition({
            gameId: data.serverId,
            creatorId: gamePack.creationInfo.creatorId,
            isAvailable: true,
            title: gamePack.creationInfo.descriptions[0].title,
            description: gamePack.creationInfo.descriptions[0].description,
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

export default {
    pullGamesInfo,
    pullGameInfo,
    pullGameLevel,
    saveLevelResult,
    addGamePack,
    deleteGamePack
};
