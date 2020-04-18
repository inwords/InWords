import apiAction from './apiAction';

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

export const getTrainingHistory = () => dispatch =>
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
