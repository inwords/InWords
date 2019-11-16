import apiAction from './apiAction';
import * as trainingActions from './trainingActions';
import { setSnackbar } from './commonActions';

export function receiveTrainingCategories() {
  return apiAction({
    endpoint: 'game/gameInfo',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.initializeTrainingCategories(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось загрузить категории' }));
      }
    ]
  });
}

export function receiveTrainingCategory(categoryId) {
  return apiAction({
    endpoint: `game/${categoryId}`,
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.initializeTrainingCategory(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
      }
    ]
  });
}

export function addTrainingCategoryWordsToDictionary(categoryId) {
  return apiAction({
    endpoint: 'game/addWordsToUserDictionary',
    method: 'POST',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(setSnackbar({ text: `Добавлено слов: ${data}` }));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось добавить слова' }));
      }
    ]
  });
}

export function receiveTrainingLevel(levelId) {
  return apiAction({
    endpoint: `game/level/${levelId}`,
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.initializeTrainingLevel(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось загрузить уровень' }));
      }
    ]
  });
}

export function saveTrainingLevelResult(levelResult, actionOnSuccess) {
  return apiAction({
    apiVersion: 'v1.1',
    endpoint: 'game/score',
    method: 'POST',
    data: JSON.stringify(levelResult),
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.updateTrainingCategoryLevelResult(data));
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
