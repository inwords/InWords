import apiAction from './apiAction';
import gamesActions from './gamesActions';
import commonActions from './commonActions';

function receiveGamesInfo() {
    return apiAction({
        endpoint: 'game/gameInfo',
        actionsOnSuccess: [
            (dispatch, data) => dispatch(gamesActions.initializeGamesInfo(data))
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось загрузить игры'))
        ]
    });
}

function receiveGameInfo(gameId) {
    return apiAction({
        endpoint: `game/${gameId}`,
        actionsOnSuccess: [
            (dispatch, data) => dispatch(gamesActions.initializeGameInfo(data))
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось загрузить игру'))
        ]
    });
}

function receiveGameLevel(levelId) {
    return apiAction({
        endpoint: `game/level/${levelId}`,
        actionsOnSuccess: [
            (dispatch, data) => dispatch(gamesActions.initializeGameLevel(data))
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось загрузить уровень'))
        ]
    });
}

function saveLevelResult(levelResult) {
    return apiAction({
        endpoint: `game/score`,
        method: 'POST',
        data: JSON.stringify(levelResult),
        actionsOnSuccess: [
            (dispatch, data) => dispatch(gamesActions.updateGameInfo(data))
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось сохранить результат'))
        ]
    });
}

export default {
    receiveGamesInfo,
    receiveGameInfo,
    receiveGameLevel,
    saveLevelResult
};
