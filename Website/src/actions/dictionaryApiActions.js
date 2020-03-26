import apiAction from './apiAction';

export const syncWordPairs = wordPairIds => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/dictionary/getWords',
        method: 'POST',
        data: JSON.stringify({ userWordpairIds: wordPairIds }),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const deleteWordPairs = pairIds => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/dictionary/deleteWords',
        method: 'POST',
        data: JSON.stringify({ delete: pairIds }),
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
          words: wordPairs.map((wordPair, index) => ({
            localId: index,
            ...wordPair
          }))
        }),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );

export const updateWordPairs = wordPairsMap => dispatch =>
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
// new Promise((resolve, reject) =>
//   dispatch(
//     apiAction({
//       apiVersion: '2',
//       endpoint: '/dictionary/updateWords',
//       method: 'POST',
//       data: JSON.stringify({
//         words: wordPairs.map((wordPair, index) => ({
//           localId: index,
//           deleteId: wordPair.serverId,
//           ...wordPair
//         }))
//       }),
//       onSuccess: resolve,
//       onFailure: reject
//     })
//   )
// );

export const receiveWordTranslations = word => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(
      apiAction({
        apiVersion: '2',
        endpoint: '/dictionary/lookup',
        method: 'POST',
        data: JSON.stringify({ text: word, lang: 'en-ru' }),
        onSuccess: resolve,
        onFailure: reject
      })
    )
  );
