import apiAction from './apiAction';

export const getWordSets = () => dispatch =>
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

export const getWordSetLevels = id => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: `/wordSet/${id}`,
        resolve,
        reject
      })
    )
  );

export const getWordSetLevel = id => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: `/wordset/level/${id}`,
        resolve,
        reject
      })
    )
  );

export const getWordSetList = id => dispatch =>
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
