import apiAction from './apiAction';

export const syncWordPairs = wordPairIds => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/dictionary/getWords',
        method: 'POST',
        data: JSON.stringify({ UserWordpairIds: wordPairIds }),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const deleteWordPairs = pairIds => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: '/words/deletePair',
        method: 'POST',
        data: JSON.stringify(pairIds),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const addWordPairs = wordPairs => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/dictionary/addWords',
        method: 'POST',
        data: JSON.stringify({
          Words: wordPairs.map(({ wordNative, wordForeign }, index) => ({
            LocalId: index,
            WordForeign: wordForeign,
            WordNative: wordNative
          }))
        }),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const editWordPairs = wordPairsMap => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        endpoint: '/words/updatePair',
        method: 'POST',
        data: JSON.stringify(wordPairsMap),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );
