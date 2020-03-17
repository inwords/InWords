import apiAction from './apiAction';
import {
  syncWordPairs as syncWordPairsAction,
  deleteWordPairs as deleteWordPairsAction,
  addWordPairs as addWordPairsAction,
  editWordPairs as editWordPairsAction
} from './dictionaryActions';
import { setSnackbar } from './commonActions';

export const syncWordPairs = wordPairIds =>
  apiAction({
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

export const deleteWordPairs = pairIds =>
  apiAction({
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

export const addWordPairs = (wordPairs, { onSuccess } = {}) =>
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
    onSuccess: ({ dispatch, data }) => {
      dispatch(
        addWordPairsAction(
          wordPairs.map((wordPair, index) => ({
            ...wordPair,
            serverId: data.wordIds[index].serverId
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

export const editWordPairs = wordPairsMap =>
  apiAction({
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
