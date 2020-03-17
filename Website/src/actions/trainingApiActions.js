import apiAction from './apiAction';
import {
  initializeCourses,
  initializeWordSet,
  initializeCourse,
  initializeLevel,
  initializeHistory
} from './trainingActions';
import { resetWordPairsActuality } from './dictionaryActions';
import { setSnackbar } from './commonActions';

export const receiveCourses = () =>
  apiAction({
    endpoint: '/game/gameInfo',
    onSuccess: ({ dispatch, data }) => {
      dispatch(initializeCourses(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить темы' }));
    }
  });

export const receiveCourse = courseId =>
  apiAction({
    endpoint: `/game/${courseId}`,
    onSuccess: ({ dispatch, data }) => {
      dispatch(initializeCourse(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
    }
  });

export const receiveWordSet = courseId =>
  apiAction({
    apiVersion: '2',
    endpoint: '/wordSet/getWordsList',
    method: 'POST',
    data: JSON.stringify({ WordSetId: courseId }),
    onSuccess: ({ dispatch, data }) => {
      dispatch(initializeWordSet(courseId, data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить набор слов' }));
    }
  });

export const addCourseWordPairsToDictionary = courseId =>
  apiAction({
    endpoint: '/game/addWordsToUserDictionary',
    method: 'POST',
    data: JSON.stringify(courseId),
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

export const receiveLevel = levelId =>
  apiAction({
    endpoint: `/game/level/${levelId}`,
    onSuccess: ({ dispatch, data }) => {
      dispatch(initializeLevel(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить уровень' }));
    }
  });

export const saveLevelResult = (levelResult, { onSuccess } = {}) =>
  apiAction({
    apiVersion: '1.1',
    endpoint: '/training/estimate',
    method: 'POST',
    data: JSON.stringify({ metrics: [levelResult] }),
    onSuccess: ({ dispatch, data }) => {
      if (onSuccess) {
        onSuccess({ dispatch, data });
      }
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось сохранить результат' }));
    }
  });

export const receiveHistory = () =>
  apiAction({
    apiVersion: '1.1',
    endpoint: '/customLevel/history',
    onSuccess: ({ dispatch, data }) => {
      dispatch(initializeHistory(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить историю' }));
    }
  });

export const receiveTrainingWordPairs = () =>
  apiAction({
    apiVersion: '1.1',
    endpoint: '/dictionary/training',
    onSuccess: ({ dispatch, data }) => {
      dispatch(
        initializeLevel({
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
