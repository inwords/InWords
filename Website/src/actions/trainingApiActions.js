import apiAction from './apiAction';

export const receiveCourse = id => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: `/game/${id}`,
        resolve,
        reject
      })
    )
  );

export const receiveLevel = id => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: `/game/level/${id}`,
        resolve,
        reject
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
        resolve,
        reject
      })
    )
  );

export const receiveHistory = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '1.1',
        endpoint: '/customLevel/history',
        resolve,
        reject
      })
    )
  );

export const receiveTrainingWordPairs = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '1.1',
        endpoint: '/dictionary/training',
        resolve,
        reject
      })
    )
  );
