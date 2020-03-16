import apiAction from './apiAction';
import {
  syncWordPairs as syncWordPairsAction,
  deleteWordPairs as deleteWordPairsAction,
  addWordPairs as addWordPairsAction,
  editWordPairs as editWordPairsAction
} from './dictionaryActions';
import { setSnackbar } from './commonActions';

export function syncWordPairs(wordPairIds) {
  return apiAction({
    apiVersion: '2',
    endpoint: '/dictionary/getWords',
    method: 'POST',
    data: JSON.stringify({ UserWordpairIds: wordPairIds }),
    onSuccess: ({ dispatch, data }) => {
      dispatch(syncWordPairsAction(data));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить словарь' }));
    }
  });
}

export function deleteWordPairs(pairIds) {
  return apiAction({
    endpoint: '/words/deletePair',
    method: 'POST',
    data: JSON.stringify(pairIds),
    onSuccess: ({ dispatch }) => {
      dispatch(deleteWordPairsAction(pairIds));
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось удалить слова' }));
    }
  });
}

export function addWordPairs(wordPairs, { onSuccess } = {}) {
  return apiAction({
    apiVersion: '2',
    endpoint: '/words/addWords',
    method: 'POST',
    data: JSON.stringify({
      Words: wordPairs.map(({ wordNative, wordForeign }, index) => ({
        WordNative: wordNative,
        WordForeign: wordForeign,
        LocalId: index
      }))
    }),
    onSuccess: ({ dispatch, data }) => {
      dispatch(
        addWordPairsAction(
          wordPairs.map((wordPair, index) => ({
            ...wordPair,
            serverId: data[index].serverId
          }))
        )
      );

      if (onSuccess) {
        onSuccess({ dispatch, data });
      }
    },
    onFailure: ({ dispatch }) => {
      dispatch(setSnackbar({ text: 'Не удалось добавить слова' }));
    }
  });
}

export function editWordPairs(wordPairsMap) {
  return apiAction({
    endpoint: '/words/updatePair',
    method: 'POST',
    data: JSON.stringify(wordPairsMap),
    onSuccess: ({ dispatch, data }) => {
      dispatch(
        editWordPairsAction(
          Object.entries(wordPairsMap).map((wordPairEntry, index) => ({
            ...wordPairEntry[1],
            oldServerId: +wordPairEntry[0],
            serverId: data[index].serverId
          }))
        )
      );
    },
    onFailure: ({ dispatch }) => {
      dispatch(
        setSnackbar({
          text: 'Не удалось изменить слова'
        })
      );
    }
  });
}
