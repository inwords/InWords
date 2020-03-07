import apiAction from './apiAction';
import * as trainingActions from './trainingActions';
import { setSnackbar } from './commonActions';

export function receiveCourses() {
  return apiAction({
    endpoint: '/game/gameInfo',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.initializeCourses(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось загрузить темы' }));
      }
    ]
  });
}

export function receiveCourse(courseId) {
  return apiAction({
    endpoint: `/game/${courseId}`,
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.initializeCourse(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
      }
    ]
  });
}

export function addCourseWordPairsToDictionary(courseId) {
  return apiAction({
    endpoint: '/game/addWordsToUserDictionary',
    method: 'POST',
    data: JSON.stringify(courseId),
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

export function receiveLevel(levelId) {
  return apiAction({
    endpoint: `/game/level/${levelId}`,
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.initializeLevel(data));
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
    apiVersion: '1.1',
    endpoint: '/training/estimate',
    method: 'POST',
    data: JSON.stringify({ metrics: [levelResult] }),
    contentType: 'application/json',
    actionsOnSuccess: [
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

export function receiveHistory() {
  return apiAction({
    apiVersion: '1.1',
    endpoint: '/customLevel/history',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(trainingActions.initializeHistory(data));
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
    apiVersion: '1.1',
    endpoint: '/dictionary/training',
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(
          trainingActions.initializeLevel({
            levelId: 0,
            wordTranslations: data
          })
        );
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
