import apiAction from './apiAction';

export const receiveCourses = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: '/game/gameInfo',
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const receiveCourse = courseId => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: `/game/${courseId}`,
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const receiveWordSet = courseId => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/wordSet/getWordsList',
        method: 'POST',
        data: JSON.stringify({ WordSetId: courseId }),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const addCourseWordPairsToDictionary = courseId => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: '/game/addWordsToUserDictionary',
        method: 'POST',
        data: JSON.stringify(courseId),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const receiveLevel = levelId => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: `/game/level/${levelId}`,
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const saveLevelResult = levelResult => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '1.1',
        endpoint: '/training/estimate',
        method: 'POST',
        data: JSON.stringify({ metrics: [levelResult] }),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const receiveHistory = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '1.1',
        endpoint: '/customLevel/history',
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const receiveTrainingWordPairs = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '1.1',
        endpoint: '/dictionary/training',
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );
