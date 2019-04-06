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
        errorMessage: 'Ошибка сохранения результата'
    });
}

const gameApiActions = {
    pullGamesInfo,
    pullGameInfo,
    pullGameLevel,
    saveLevelResult
};

export default gameApiActions;
