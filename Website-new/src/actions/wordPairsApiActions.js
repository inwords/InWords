import apiAction from './apiAction';
import wordPairsActions from './wordPairsActions';
import commonActions from './commonActions';

function receiveWordPairs() {
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

function deleteWordPairs(pairIds) {
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

function addWordPair(wordPair) {
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

function deleteWordPairAsEditPart(pairId) {
    return apiAction({
        endpoint: 'words/deletePair',
        method: 'POST',
        data: JSON.stringify([pairId]),
        actionsOnFailure: [
            dispatch => dispatch(commonActions.setSnackbarMessage('Не удалось отредактировать слово'))
        ]
    });
}

function addWordPairAsEditPart(wordPair) {
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

export default {
    receiveWordPairs,
    deleteWordPairs,
    addWordPair,
    deleteWordPairAsEditPart,
    addWordPairAsEditPart
};
