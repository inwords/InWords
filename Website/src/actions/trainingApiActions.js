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
        dispatch(setSnackbar({ text: 'Не удалось загрузить темы' }));
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

export function addCategoryWordsToDictionary(categoryId) {
  return apiAction({
    endpoint: 'game/addWordsToUserDictionary',
    method: 'POST',
    data: JSON.stringify(categoryId),
    contentType: 'application/json',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(
          setSnackbar({ text: `Добавлено новых слов: ${data.wordsAdded}` })
        );
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
    endpoint: 'training/estimate',
    method: 'POST',
    data: JSON.stringify({ metrics: [levelResult] }),
    contentType: 'application/json',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.updateLevelResult(data));
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

export function receiveTrainingHistory() {
  return apiAction({
    apiVersion: 'v1.1',
    endpoint: 'customLevel/history',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.initializeTrainingHistory(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось загрузить историю' }));
      }
    ]
  });
}

export function receiveTrainingWordPairs() {
  return apiAction({
    apiVersion: 'v1.1',
    endpoint: 'dictionary/training',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.initializeTrainingWordPairs(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(
          setSnackbar({
            text: 'Не удалось загрузить слова для повторения'
          })
        );
      }
    ]
  });
}
