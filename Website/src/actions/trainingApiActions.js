import apiAction from './apiAction';

export const saveLevelResult = (levelId, metrics) => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/wordSet/estimate',
        method: 'POST',
        data: JSON.stringify({
          metrics: [
            levelId > 0
              ? {
                  gameLevelId: levelId > 0 ? levelId : 0,
                  ...metrics
                }
              : metrics
          ]
        }),
<<<<<<< HEAD
=======
        resolve,
        reject
      })
    )
  );

export const saveCustomLevelResult = levelResult => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/classicCardGame/save',
        method: 'POST',
        data: JSON.stringify({ info: [levelResult] }),
>>>>>>> develop
        resolve,
        reject
      })
    )
  );

export const getTrainingHistory = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/wordSet/history',
        resolve,
        reject
      })
    )
  );
