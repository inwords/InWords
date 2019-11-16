import apiAction from './apiAction';
import * as wordPairsActions from './dictionaryActions';
import { setSnackbar } from './commonActions';

export function syncWordPairs(wordPairs) {
  return apiAction({
    endpoint: 'sync/pullWordPairs',
    method: 'POST',
    data: JSON.stringify(wordPairs),
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(wordPairsActions.initializeWordPairs(data));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось загрузить словарь' }));
      }
    ]
  });
}

export function deleteWordPairs(pairIds) {
  return apiAction({
    endpoint: 'words/deletePair',
    method: 'POST',
    data: JSON.stringify(pairIds),
    actionsOnSuccess: [
      dispatch => {
        dispatch(wordPairsActions.updateWordPairsAfterDeletion(pairIds));
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось удалить слова' }));
      }
    ]
  });
}

export function addWordPairs(wordPairs) {
  return apiAction({
    endpoint: 'words/addPair',
    method: 'POST',
    data: JSON.stringify(wordPairs),
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(
          wordPairsActions.updateWordPairsAfterAddition(
            wordPairs.map((wordPair, index) => ({
              ...wordPair,
              serverId: data[index].serverId
            }))
          )
        );
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(setSnackbar({ text: 'Не удалось добавить слово' }));
      }
    ]
  });
}

export function editWordPair(pairId, wordPair) {
  return apiAction({
    endpoint: 'words/updatePair',
    method: 'POST',
    data: JSON.stringify({ [pairId]: wordPair }),
    actionsOnSuccess: [
      (dispatch, data) => {
        dispatch(
          wordPairsActions.updateWordPairsAfterEditing(pairId, {
            serverId: data[0].serverId,
            ...wordPair
          })
        );
      }
    ],
    actionsOnFailure: [
      dispatch => {
        dispatch(
          setSnackbar({
            text: 'Не удалось изменить слово'
          })
        );
      }
    ]
  });
}
