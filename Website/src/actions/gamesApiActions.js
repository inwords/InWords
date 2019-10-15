import apiAction from './apiAction';
import * as gamesActions from './gamesActions';
import { setSnackbar } from './commonActions';

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
        dispatch(setSnackbar({ text: 'Не удалось загрузить категорию' }));
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
        dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
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
        dispatch(setSnackbar({ text: 'Не удалось загрузить уровень' }));
      }
    ]
  });
}

export function saveLevelResult(levelResult, actionOnSuccess) {
  return apiAction({
    apiVersion: 'v1.1',
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
        dispatch(setSnackbar({ text: 'Не удалось сохранить результат' }));
      }
    ]
  });
}
