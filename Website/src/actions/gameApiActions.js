import gameActions from './gameActions';
import apiAction from './apiAction';

function pullGamesInfo() {
    return apiAction({
        endpoint: 'Game/GameInfo',
        actionsOnSuccess: [gameActions.initializeGamesInfo],
        errorMessage: 'Не удалось загрузить игры'
    });
}

function pullGameInfo(gameId) {
    return apiAction({
        endpoint: `Game/${gameId}`,
        actionsOnSuccess: [gameActions.initializeGameInfo],
        errorMessage: 'Не удалось загрузить игру'
    });
}

function pullGameLevel(levelId) {
    return apiAction({
        endpoint: `Game/Level/${levelId}`,
        actionsOnSuccess: [gameActions.initializeGameLevel],
        errorMessage: 'Не удалось загрузить уровень'
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
        errorMessage: 'Не удалось сохранить результат'
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
            description: gamePack.creationInfo.descriptions[0].description
        })],
        redirection: '/games/1',
        errorMessage: 'Не удалось создать игру'
    });
}

function deleteGamePack(gameId) {
    return apiAction({
        endpoint: `Game/Delete/${gameId}`,
        method: 'DELETE',
        actionsOnSuccess: [() => gameActions.updateGamesInfoAfterDeletion(gameId)],
        errorMessage: 'Не удалось удалить игру'
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
