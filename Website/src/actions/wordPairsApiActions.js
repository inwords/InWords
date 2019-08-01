import apiAction from './apiAction';
import * as wordPairsActions from './wordPairsActions';
import * as commonActions from './commonActions';

export function receiveWordPairs() {
    return apiAction({
        endpoint: 'sync/pullWordPairs',
        method: 'POST',
        data: JSON.stringify([]),
        actionsOnSuccess: [
            (dispatch, data) => dispatch(wordPairsActions.initializeWordPairs(data))
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось загрузить словарь'))
        ]
    });
}

export function deleteWordPairs(pairIds) {
    return apiAction({
        endpoint: 'words/deletePair',
        method: 'POST',
        data: JSON.stringify(pairIds),
        actionsOnSuccess: [
            dispatch => dispatch(wordPairsActions.updateWordPairsAfterDeletion(pairIds))
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось удалить слова'))
        ]
    });
}

export function addWordPair(wordPair) {
    return apiAction({
        endpoint: 'words/addPair',
        method: 'POST',
        data: JSON.stringify([wordPair]),
        actionsOnSuccess: [
            (dispatch, data) => dispatch(wordPairsActions.updateWordPairsAfterAddition({
                serverId: data[0].serverId,
                ...wordPair
            }))
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось добавить слово'))
        ]
    });
}

export function deleteWordPairAsEditPart(pairId) {
    return apiAction({
        endpoint: 'words/deletePair',
        method: 'POST',
        data: JSON.stringify([pairId]),
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось отредактировать слово'))
        ]
    });
}

export function addWordPairAsEditPart(wordPair) {
    return apiAction({
        endpoint: 'words/addPair',
        method: 'POST',
        data: JSON.stringify([wordPair]),
        actionsOnSuccess: [
            (dispatch, data) => dispatch(wordPairsActions.updateWordPairsAfterEditing(
                wordPair.id, {
                    serverId: data[0].serverId,
                    ...wordPair
                }
            ))
        ],
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось отредактировать слово'))
        ]
    });
}
