import apiAction from './apiAction';
import * as wordPairsActions from './dictionaryActions';
import { setSnackbar } from './commonActions';

export function syncWordPairs(wordPairs) {
  return apiAction({
    endpoint: '/sync/pullWordPairs',
    method: 'POST',
    data: JSON.stringify(wordPairs),
    contentType: 'application/json',
    onSuccess: (dispatch, data) => {
      dispatch(wordPairsActions.syncWordPairs(data));
    },
    onFailure: dispatch => {
      dispatch(setSnackbar({ text: 'Не удалось загрузить словарь' }));
    }
  });
}

export function deleteWordPairs(pairIds) {
  return apiAction({
    endpoint: '/words/deletePair',
    method: 'POST',
    data: JSON.stringify(pairIds),
    contentType: 'application/json',
    onSuccess: dispatch => {
      dispatch(wordPairsActions.deleteWordPairs(pairIds));
    },
    onFailure: dispatch => {
      dispatch(setSnackbar({ text: 'Не удалось удалить слова' }));
    }
  });
}

export function addWordPairs(wordPairs) {
  return apiAction({
    endpoint: '/words/addPair',
    method: 'POST',
    data: JSON.stringify(wordPairs),
    contentType: 'application/json',
    onSuccess: (dispatch, data) => {
      dispatch(
        wordPairsActions.addWordPairs(
          wordPairs.map((wordPair, index) => ({
            ...wordPair,
            serverId: data[index].serverId
          }))
        )
      );
    },
    onFailure: dispatch => {
      dispatch(setSnackbar({ text: 'Не удалось добавить слово' }));
    }
  });
}

export function editWordPairs(wordPairsMap) {
  return apiAction({
    endpoint: '/words/updatePair',
    method: 'POST',
    data: JSON.stringify(wordPairsMap),
    contentType: 'application/json',
    onSuccess: (dispatch, data) => {
      dispatch(
        wordPairsActions.editWordPairs(
          Object.entries(wordPairsMap).map((wordPairEntry, index) => ({
            ...wordPairEntry[1],
            oldServerId: +wordPairEntry[0],
            serverId: data[index].serverId
          }))
        )
      );
    },
    onFailure: dispatch => {
      dispatch(
        setSnackbar({
          text: 'Не удалось изменить слово'
        })
      );
    }
  });
}
