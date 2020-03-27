import apiAction from './apiAction';

export const receiveWordSets = () => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/wordSet/sets',
        resolve,
        reject
      })
    )
  );

export const receiveWordSet = id => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/wordSet/getWordsList',
        method: 'POST',
        data: JSON.stringify({ wordSetId: id }),
        resolve,
        reject
      })
    )
  );

export const addWordSetToDictionary = id => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/wordSet/to-dictionary',
        method: 'POST',
        data: JSON.stringify({ wordSetId: id }),
        resolve,
        reject
      })
    )
  );
