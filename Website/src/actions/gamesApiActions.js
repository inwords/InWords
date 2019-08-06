import apiAction from './apiAction';
import * as gamesActions from './gamesActions';
import * as commonActions from './commonActions';

export function receiveGamesInfo() {
  return apiAction({
    endpoint: 'game/gameInfo',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(gamesActions.initializeGamesInfo(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(commonActions.setSnackbarMessage('Не удалось загрузить игры'));
      }
    ]
  });
}

export function receiveGameInfo(gameId) {
  return apiAction({
    endpoint: `game/${gameId}`,
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(gamesActions.initializeGameInfo(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(commonActions.setSnackbarMessage('Не удалось загрузить игру'));
      }
    ]
  });
}

export function receiveGameLevel(levelId) {
  return apiAction({
    endpoint: `game/level/${levelId}`,
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(gamesActions.initializeGameLevel(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(
          commonActions.setSnackbarMessage('Не удалось загрузить уровень')
        );
      }
    ]
  });
}

export function saveLevelResult(levelResult, actionOnSuccess) {
  return apiAction({
    endpoint: 'game/score',
    method: 'POST',
    data: JSON.stringify(levelResult),
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(gamesActions.updateGameInfo(data));
      },
      (_, data) => {
        actionOnSuccess(data);
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(
          commonActions.setSnackbarMessage('Не удалось сохранить результат')
        );
      }
    ]
  });
}
