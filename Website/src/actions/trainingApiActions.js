import apiAction from './apiAction';
import * as trainingActions from './trainingActions';
import { resetWordPairsActuality } from './dictionaryActions';
import { setSnackbar } from './commonActions';

export function receiveCourses() {
  return apiAction({
    endpoint: '/game/gameInfo',
    onSuccess: ({ dispatch, data }) => {
      dispatch(trainingActions.initializeCourses(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить темы' }));
    }
  });
}

export function receiveCourse(courseId) {
  return apiAction({
    endpoint: `/game/${courseId}`,
    onSuccess: ({ dispatch, data }) => {
      dispatch(trainingActions.initializeCourse(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
    }
  });
}

export function addCourseWordPairsToDictionary(courseId) {
  return apiAction({
    endpoint: '/game/addWordsToUserDictionary',
    method: 'POST',
    data: JSON.stringify(courseId),
    contentType: 'application/json',
    onSuccess: ({ dispatch, data }) => {
      dispatch(
        setSnackbar({ text: `Добавлено новых слов: ${data.wordsAdded}` })
      );

      dispatch(resetWordPairsActuality());
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось добавить слова' }));
    }
  });
}

export function receiveLevel(levelId) {
  return apiAction({
    endpoint: `/game/level/${levelId}`,
    onSuccess: ({ dispatch, data }) => {
      dispatch(trainingActions.initializeLevel(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить уровень' }));
    }
  });
}

export function saveLevelResult(levelResult, actionOnSuccess) {
  return apiAction({
    apiVersion: '1.1',
    endpoint: '/training/estimate',
    method: 'POST',
    data: JSON.stringify({ metrics: [levelResult] }),
    contentType: 'application/json',
    onSuccess: ({ data }) => {
      actionOnSuccess(data);
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось сохранить результат' }));
    }
  });
}

export function receiveHistory() {
  return apiAction({
    apiVersion: '1.1',
    endpoint: '/customLevel/history',
    onSuccess: ({ dispatch, data }) => {
      dispatch(trainingActions.initializeHistory(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить историю' }));
    }
  });
}

export function receiveTrainingWordPairs() {
  return apiAction({
    apiVersion: '1.1',
    endpoint: '/dictionary/training',
    onSuccess: ({ dispatch, data }) => {
      dispatch(
        trainingActions.initializeLevel({
          levelId: 0,
          wordTranslations: data
        })
      );
    },
    onFailure: ({ dispatch }) => {
      dispatch(
        setSnackbar({
          text: 'Не удалось загрузить слова для повторения'
        })
      );
    }
  });
}
